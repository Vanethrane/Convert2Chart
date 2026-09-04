import { useState } from "react";
import {
  units,
  temperatureUnits,
  convertUnit
} from "../data/conversions.js";
import { conversionSlug } from "../utils/urls.js";

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

  const slug = conversionSlug(
    categoryUnits[from],
    categoryUnits[to]
  );

  window.history.pushState({}, "", `/${slug}/`);
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
  const [category, setCategory] =
    useState(initialCategory);

  const [from, setFrom] =
    useState(initialFrom);

  const [to, setTo] =
    useState(initialTo);

  const [value, setValue] =
    useState("");

  const [chartStart, setChartStart] =
    useState(1);

  const [chartEnd, setChartEnd] =
    useState(100);

  const [chartLines, setChartLines] =
    useState(20);

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

    setCategory(nextCategory);

    if (onCategoryChange) {
      onCategoryChange(nextCategory);
    }

    setFrom(nextFrom);
    setTo(nextTo);
    setChartUnits([nextTo]);

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
        20,
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

  const availableChartUnits =
    Object.entries(categoryUnits)
      .filter(
        ([key]) =>
          key !== from &&
          !chartUnits.includes(key)
      );

  return (
    <>
      <div className="converter">

        <div className="category-tabs">

          {Object.entries(units).map(
            ([key, data]) => (
              <button
                key={key}
                className={
                  category === key
                    ? "active"
                    : ""
                }
                onClick={() =>
                  changeCategory(key)
                }
                type="button"
              >
                {data.name}
              </button>
            )
          )}

          <button
            className={
              category === "temperature"
                ? "active"
                : ""
            }
            onClick={() =>
              changeCategory(
                "temperature"
              )
            }
            type="button"
          >
            Temperature
          </button>

        </div>

        <div className="selectors">

          <select
            value={from}
            onChange={e =>
              changeFrom(
                e.target.value
              )
            }
          >
            {Object.entries(
              categoryUnits
            ).map(
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
            value={to}
            onChange={e =>
              changeTo(
                e.target.value
              )
            }
          >
            {Object.entries(
              categoryUnits
            ).map(
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
                {result || "0"}
              </output>

              <span>
                <UnitSymbol
                  unit={
                    categoryUnits[to]
                  }
                />
              </span>

            </div>

          </div>

        </div>

      </div>

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
              max="20"
              value={chartLines}
              onChange={e =>
                setChartLines(
                  Math.min(
                    20,
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








