import { useEffect, useRef, useState } from "react";
import {
  units,
  temperatureUnits,
  convertUnit
} from "../data/conversions.js";
import { getConversionSlug } from "../data/conversionPages.js";
import {
  CHART_LINE_MAX,
  EVERYDAY_CATEGORIES,
  chartDefaults,
  searchCategories,
  searchUnits
} from "../data/contentShared.js";
import { conversionPath } from "../utils/urls.js";

const MOBILE_BANNER =
  "//massivesalad.com/b.XpVOsUdvGSlF0GYGWXcA/Fe-mx9rubZUUlljkCPWT/cm1bM/DQc/w/MrT/cSt/NpzTUlwVNOzCAUyFMuQy";
const DESKTOP_BANNER =
  "//massivesalad.com/b/X.VHs/d/G/lw0NYzWJci/dekmE9Pu-Z/UMlnkQPqT/cz1oMwDWcswQMBjukFt/NUzaUPw-NczlAwzWMDwv";
const SHARED_BANNER =
  "//massivesalad.com/bGXqVKs.dqGslK0VY/W/cY/ZeFmY9/u/Z_UslNkxPOTJcA1iMwDDcfwaNRDkUstZNKzQUEwiNnz/AM0AONQz";
const DIRECT_BANNER =
  "https://motionless-bus.com/bS3HV.0mPT3mpivEbjmCVnJiZtDi0T3/NtT/AK3QM/D/Y/xrL/TmcH1cMlDmcgwEN_jOUV";

function loadBanner(parent, src) {
  const script = document.createElement("script");
  script.settings = {};
  script.src = src;
  script.async = true;
  script.referrerPolicy = "no-referrer-when-downgrade";
  parent.appendChild(script);
}

function BannerSlot() {
  const slot = useRef(null);

  useEffect(() => {
    const parent = slot.current;

    if (!parent) return;

    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const sources = mobile
      ? [MOBILE_BANNER, MOBILE_BANNER]
      : [DESKTOP_BANNER, DESKTOP_BANNER];

    for (const src of [...sources, SHARED_BANNER, DIRECT_BANNER]) {
      loadBanner(parent, src);
    }

    return () => {
      parent.replaceChildren();
    };
  }, []);

  return (
    <div
      className="ad-placements ad-placements-inline"
      ref={slot}
    />
  );
}

function format(value) {
  if (!Number.isFinite(value)) return "";

  const truncated =
    Math.trunc(value * 1000000) / 1000000;

  return truncated.toString();
}

function getUnits(category) {
  if (category === "temperature") {
    return temperatureUnits;
  }

  return units[category].units;
}

function updateUrl(category, from, to) {
  const categoryUnits = getUnits(category);

  const slug =
    getConversionSlug(category, from, to) ||
    conversionPath(
      category,
      categoryUnits[from],
      categoryUnits[to]
    );

  const nextPath = `/${slug}`.replace(/\/$/, "");
  const currentPath = window.location.pathname.replace(/\/$/, "");

  if (currentPath === nextPath) {
    return;
  }

  window.location.assign(`${nextPath}/`);
}

function UnitSymbol({ unit }) {
  if (
    unit.symbol === "C" ||
    unit.symbol === "F"
  ) {
    return (
      <>
        <span className="degree-symbol">°</span>
        {unit.symbol}
      </>
    );
  }

  return unit.symbol;
}

export default function UnitConverter({
  initialCategory = "length",
  initialFrom = "meter",
  initialTo = "foot",
  onCategoryChange
}) {
  const initialChart = chartDefaults(initialCategory);

  const [category, setCategory] =
    useState(initialCategory);

  const [from, setFrom] =
    useState(initialFrom);

  const [to, setTo] =
    useState(initialTo);

  const [value, setValue] =
    useState("");

  const [unitQuery, setUnitQuery] =
    useState("");

  const [copied, setCopied] =
    useState(false);

  const [chartStart, setChartStart] =
    useState(initialChart.start);

  const [chartEnd, setChartEnd] =
    useState(initialChart.end);

  const [chartLines, setChartLines] =
    useState(initialChart.lines);

  const [chartUnits, setChartUnits] =
    useState([initialTo]);

  const categoryUnits =
    getUnits(category);

  const result =
    value === ""
      ? ""
      : format(
          convertUnit(
            Number(value),
            from,
            to,
            category
          )
        );

  function changeCategory(nextCategory) {
    const nextUnits =
      getUnits(nextCategory);

    const keys =
      Object.keys(nextUnits);

    const nextFrom =
      keys[0];

    const nextTo =
      keys[1];

    const nextChart = chartDefaults(nextCategory);

    setCategory(nextCategory);

    if (onCategoryChange) {
      onCategoryChange(nextCategory);
    }

    setFrom(nextFrom);
    setTo(nextTo);
    setChartUnits([nextTo]);
    setChartStart(nextChart.start);
    setChartEnd(nextChart.end);
    setChartLines(nextChart.lines);
    setUnitQuery("");

    updateUrl(
      nextCategory,
      nextFrom,
      nextTo
    );
  }

  function changeFrom(newFrom) {
    setFrom(newFrom);

    updateUrl(
      category,
      newFrom,
      to
    );
  }

  function changeTo(newTo) {
    setTo(newTo);

    setChartUnits(current => {
      if (
        current.length === 0
      ) {
        return [newTo];
      }

      return [
        newTo,
        ...current.filter(
          unit => unit !== newTo
        )
      ];
    });

    updateUrl(
      category,
      from,
      newTo
    );
  }

  function swapUnits() {
    const newFrom = to;
    const newTo = from;

    setFrom(newFrom);
    setTo(newTo);

    setChartUnits(current =>
      current.map(unit =>
        unit === newFrom
          ? newTo
          : unit === newTo
            ? newFrom
            : unit
      )
    );

    updateUrl(
      category,
      newFrom,
      newTo
    );
  }

  function addChartUnit(unitKey) {
    if (!unitKey) return;

    setChartUnits(current => {
      if (
        current.includes(unitKey) ||
        unitKey === from
      ) {
        return current;
      }

      return [
        ...current,
        unitKey
      ];
    });
  }

  function removeChartUnit(unitKey) {
    setChartUnits(current =>
      current.filter(
        unit => unit !== unitKey
      )
    );
  }

  function printChart() {
    window.print();
  }

  function generateChartValues() {
    const start =
      Number(chartStart);

    const end =
      Number(chartEnd);

    const lines =
      Math.min(
        CHART_LINE_MAX,
        Math.max(
          1,
          Number(chartLines)
        )
      );

    if (
      !Number.isFinite(start) ||
      !Number.isFinite(end) ||
      !Number.isFinite(lines)
    ) {
      return [];
    }

    if (lines === 1) {
      return [start];
    }

    const values = [];

    const step =
      (end - start) /
      (lines - 1);

    for (
      let i = 0;
      i < lines;
      i++
    ) {
      values.push(
        start + step * i
      );
    }

    return values;
  }

  const chartValues =
    generateChartValues();

  const query = unitQuery.trim();
  const unitHits = searchUnits(query);
  const searchResults = unitHits.length
    ? unitHits
    : searchCategories(query);

  function chooseSearchResult(item) {
    setUnitQuery("");

    if (item.type === "category") {
      changeCategory(item.key);
      return;
    }

    const nextUnits = getUnits(item.category);
    const keys = Object.keys(nextUnits);
    const nextFrom = item.key;
    const nextTo =
      item.category === category && to !== item.key
        ? to
        : keys.find(key => key !== item.key);

    if (item.category !== category) {
      const nextChart = chartDefaults(item.category);
      setCategory(item.category);

      if (onCategoryChange) {
        onCategoryChange(item.category);
      }

      setChartStart(nextChart.start);
      setChartEnd(nextChart.end);
      setChartLines(nextChart.lines);
    }

    setFrom(nextFrom);
    setTo(nextTo);
    setChartUnits([nextTo]);
    updateUrl(item.category, nextFrom, nextTo);
  }

  const categoryOptions = [
    ...Object.entries(units).map(([key, data]) => ({
      key,
      name: data.name
    })),
    { key: "temperature", name: "Temperature" }
  ];

  const everydayCategories = EVERYDAY_CATEGORIES
    .map(key => categoryOptions.find(item => item.key === key))
    .filter(Boolean);

  const technicalCategories = categoryOptions
    .filter(item => !EVERYDAY_CATEGORIES.includes(item.key))
    .sort((a, b) => a.name.localeCompare(b.name));

  const availableChartUnits =
    Object.entries(categoryUnits)
      .filter(
        ([key]) =>
          key !== from &&
          !chartUnits.includes(key)
      );

  async function copyResult() {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <div className="converter">

        <div className="category-picker">
          <label>
            Category
            <select
              value={category}
              onChange={event => changeCategory(event.target.value)}
            >
              <optgroup label="Everyday">
                {everydayCategories.map(item => (
                  <option key={item.key} value={item.key}>
                    {item.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Technical">
                {technicalCategories.map(item => (
                  <option key={item.key} value={item.key}>
                    {item.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </label>

          <div className="unit-search-field">
            <label htmlFor="unit-search">
              Search units
            </label>
            <input
              id="unit-search"
              className="unit-search"
              type="search"
              value={unitQuery}
              placeholder="Search all units"
              onChange={event => setUnitQuery(event.target.value)}
              onKeyDown={event => {
                if (event.key === "Enter" && searchResults[0]) {
                  event.preventDefault();
                  chooseSearchResult(searchResults[0]);
                }
              }}
            />
            {query && (
              <ul className="search-results">
                {searchResults.length === 0 ? (
                  <li className="search-empty">No matching units</li>
                ) : (
                  searchResults.map(item => (
                    <li key={`${item.type}-${item.category || "category"}-${item.key}`}>
                      <button
                        type="button"
                        onClick={() => chooseSearchResult(item)}
                      >
                        <span>{item.name}</span>
                        <span className="search-meta">
                          {item.type === "category"
                            ? "Category"
                            : `${item.symbol} · ${item.categoryName}`}
                        </span>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>

        <div className="selectors">

          <select
            aria-label="From unit"
            value={from}
            onChange={e =>
              changeFrom(
                e.target.value
              )
            }
          >
            {Object.entries(categoryUnits).map(
              ([key, unit]) => (
                <option
                  key={key}
                  value={key}
                >
                  {unit.name}
                </option>
              )
            )}
          </select>

          <button
            className="swap"
            onClick={swapUnits}
            aria-label="Swap units"
            title="Swap units"
            type="button"
          >
            ↔
          </button>

          <select
            aria-label="To unit"
            value={to}
            onChange={e =>
              changeTo(
                e.target.value
              )
            }
          >
            {Object.entries(categoryUnits).map(
              ([key, unit]) => (
                <option
                  key={key}
                  value={key}
                >
                  {unit.name}
                </option>
              )
            )}
          </select>

        </div>

        <div className="conversion-fields">

          <div className="field">

            <label>
              {categoryUnits[from].name}
            </label>

            <div className="input-wrap">

              <input
                type="number"
                inputMode="decimal"
                value={value}
                onChange={e =>
                  setValue(
                    e.target.value
                  )
                }
                placeholder="0"
              />

              <span>
                <UnitSymbol
                  unit={
                    categoryUnits[from]
                  }
                />
              </span>

            </div>

          </div>

          <div className="equals">
            =
          </div>

          <div className="field">

            <label>
              {categoryUnits[to].name}
            </label>

            <div className="result-wrap">

              <output>
                {result}
              </output>

              <span>
                <UnitSymbol
                  unit={
                    categoryUnits[to]
                  }
                />
              </span>

            </div>

            <button
              className="copy-result"
              type="button"
              onClick={copyResult}
              disabled={result === ""}
            >
              {copied ? "Copied" : "Copy"}
            </button>

          </div>

        </div>

      </div>

      <BannerSlot />

      <section
        className="conversion-chart"
        id="printable-chart"
      >

        <div className="chart-header">

          <div>

            <h2>
              Common{" "}
              {categoryUnits[from].name} conversions
            </h2>

            <p className="chart-description">
              Custom conversion reference chart
            </p>

          </div>

          <button
            className="print-button"
            onClick={printChart}
            type="button"
          >
            Print Chart
          </button>

        </div>

        <div className="chart-controls">

          <div className="chart-control">

            <label htmlFor="chart-start">
              Start
            </label>

            <input
              id="chart-start"
              type="number"
              value={chartStart}
              onChange={e =>
                setChartStart(
                  e.target.value
                )
              }
            />

          </div>

          <div className="chart-control">

            <label htmlFor="chart-end">
              End
            </label>

            <input
              id="chart-end"
              type="number"
              value={chartEnd}
              onChange={e =>
                setChartEnd(
                  e.target.value
                )
              }
            />

          </div>

          <div className="chart-control">

            <label htmlFor="chart-lines">
              Lines
            </label>

            <input
              id="chart-lines"
              type="number"
              min="1"
              max={CHART_LINE_MAX}
              value={chartLines}
              onChange={e =>
                setChartLines(
                  Math.min(
                    CHART_LINE_MAX,
                    Math.max(
                      1,
                      Number(e.target.value)
                    )
                  )
                )
              }
            />

          </div>

          <div className="chart-control chart-add">

            <label htmlFor="add-chart-unit">
              Add unit
            </label>

            <select
              id="add-chart-unit"
              value=""
              onChange={e => {
                addChartUnit(
                  e.target.value
                );

                e.target.value = "";
              }}
            >

              <option value="">
                Select a unit...
              </option>

              {availableChartUnits.map(
                ([key, unit]) => (
                  <option
                    key={key}
                    value={key}
                  >
                    {unit.name}
                  </option>
                )
              )}

            </select>

          </div>

        </div>

        {chartUnits.length > 0 && (

          <div className="selected-chart-units">

            <span>
              Chart units:
            </span>

            {chartUnits.map(unitKey => (

              <button
                key={unitKey}
                type="button"
                onClick={() =>
                  removeChartUnit(
                    unitKey
                  )
                }
                title={`Remove ${categoryUnits[unitKey].name}`}
              >
                {categoryUnits[unitKey].name}
                {" ×"}
              </button>

            ))}

          </div>

        )}

        <div className="print-chart-title">
          <h2>
            {categoryUnits[from].name} Conversion Chart
          </h2>

          <p>
            Conversions from {categoryUnits[from].name} to{" "}
            {chartUnits
              .map(unitKey => categoryUnits[unitKey].name)
              .join(", ")}
          </p>
        </div>

        <div className="print-chart-header">
        <div className="print-chart-category">
          {category === "temperature" ? "Temperature" : units[category]?.name || category}
        </div>
        <div className="print-chart-title">
          Conversion Chart
        </div>
      </div>

      <div className="table-wrapper">

          <table>

            <thead>

              <tr>

                <th>
                  {categoryUnits[from].name}
                </th>

                {chartUnits.map(
                  unitKey => (
                    <th key={unitKey}>
                      {categoryUnits[unitKey].name}
                    </th>
                  )
                )}

              </tr>

            </thead>

            <tbody>

              {chartValues.map(
                (number, index) => (

                  <tr key={index}>

                    <td>
                      {format(number)}{" "}
                      <UnitSymbol
                        unit={
                          categoryUnits[from]
                        }
                      />
                    </td>

                    {chartUnits.map(
                      unitKey => {

                        const converted =
                          convertUnit(
                            number,
                            from,
                            unitKey,
                            category
                          );

                        return (
                          <td
                            key={unitKey}
                          >
                            {format(
                              converted
                            )}{" "}
                            <UnitSymbol
                              unit={
                                categoryUnits[
                                  unitKey
                                ]
                              }
                            />
                          </td>
                        );

                      }
                    )}

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </section>
    </>
  );
}








