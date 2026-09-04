import { useState } from "react";
import {
  units,
  temperatureUnits,
  convertUnit
} from "../data/conversions";

const commonValues = {
  length: [1, 5, 10, 12, 20, 50, 100],
  weight: [1, 5, 10, 20, 50, 100],
  volume: [1, 2, 5, 10, 20, 50, 100],
  area: [1, 10, 50, 100, 500, 1000],
  speed: [1, 5, 10, 25, 50, 60, 100],
  pressure: [1, 5, 10, 20, 50, 100],
  energy: [1, 5, 10, 50, 100, 500, 1000],
  power: [1, 5, 10, 50, 100, 500, 1000],
  time: [1, 5, 10, 15, 30, 60, 120]
};

const temperatureValues = [
  -40,
  -20,
  0,
  10,
  20,
  25,
  30,
  37,
  50,
  100
];

function format(value) {
  if (!Number.isFinite(value)) return "";
  return Number(value.toFixed(8)).toString();
}

function Symbol({ unit }) {

  if (unit.symbol === "C" || unit.symbol === "F") {
    return (
      <>
        <sup className="degree-symbol">o</sup>
        {unit.symbol}
      </>
    );
  }

  return unit.symbol;
}

export default function UnitConverter({
  initialCategory = "length",
  initialFrom = "meter",
  initialTo = "foot"
}) {

  const [category, setCategory] = useState(initialCategory);
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [value, setValue] = useState("");

  const categoryUnits =
    category === "temperature"
      ? temperatureUnits
      : units[category].units;

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

  function changeCategory(next) {

    setCategory(next);

    if (next === "temperature") {
      setFrom("celsius");
      setTo("fahrenheit");
      return;
    }

    const keys = Object.keys(units[next].units);

    setFrom(keys[0]);
    setTo(keys[1]);
  }

  function swapUnits() {
    const oldFrom = from;
    setFrom(to);
    setTo(oldFrom);
  }

  const values =
    category === "temperature"
      ? temperatureValues
      : commonValues[category] ||
        [1, 5, 10, 20, 50, 100];

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
              changeCategory("temperature")
            }
          >
            Temperature
          </button>

        </div>

        <div className="selectors">

          <select
            value={from}
           onChange={e => {
  const newFrom = e.target.value;
  setFrom(newFrom);

  if (window.location.pathname !== "/") {
    const fromUnit = categoryUnits[newFrom];
    const toUnit = categoryUnits[to];

    const fromSlug = fromUnit.name
      .replace(/^US /, "")
      .toLowerCase()
      .replace(/ per /g, "-per-")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const toSlug = toUnit.name
      .replace(/^US /, "")
      .toLowerCase()
      .replace(/ per /g, "-per-")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    window.history.pushState(
      {},
      "",
      `/${fromSlug}-to-${toSlug}/`
    );

    window.location.reload();
  }
}}
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
            type="button"
          >
            <span className="arrow-left"></span>
            <span className="arrow-right"></span>
          </button>

          <select
            value={to}
          onChange={e => {
  const newFrom = e.target.value;
  setFrom(newFrom);

  if (window.location.pathname !== "/") {
    const fromUnit = categoryUnits[newFrom];
    const toUnit = categoryUnits[to];

    const fromSlug = fromUnit.name
      .replace(/^US /, "")
      .toLowerCase()
      .replace(/ per /g, "-per-")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const toSlug = toUnit.name
      .replace(/^US /, "")
      .toLowerCase()
      .replace(/ per /g, "-per-")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    window.history.pushState(
      {},
      "",
      `/${fromSlug}-to-${toSlug}/`
    );

    window.location.reload();
  }
}}
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
              onChange={e => {
  const newFrom = e.target.value;
  setFrom(newFrom);

  if (window.location.pathname !== "/") {
    const fromUnit = categoryUnits[newFrom];
    const toUnit = categoryUnits[to];

    const fromSlug = fromUnit.name
      .replace(/^US /, "")
      .toLowerCase()
      .replace(/ per /g, "-per-")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const toSlug = toUnit.name
      .replace(/^US /, "")
      .toLowerCase()
      .replace(/ per /g, "-per-")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    window.history.pushState(
      {},
      "",
      `/${fromSlug}-to-${toSlug}/`
    );

    window.location.reload();
  }
}}
                placeholder="0"
              />

              <span>
                <Symbol unit={categoryUnits[from]} />
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
                <Symbol unit={categoryUnits[to]} />
              </span>

            </div>

          </div>

        </div>

      </div>

      <section className="conversion-chart">

        <h2>
          Common {categoryUnits[from].name} to{" "}
          {categoryUnits[to].name} conversions
        </h2>

        <p className="chart-description">
          Quick reference for common{" "}
          {categoryUnits[from].name.toLowerCase()}{" "}
          values converted to{" "}
          {categoryUnits[to].name.toLowerCase()}.
        </p>

        <div className="table-wrapper">

          <table>

            <thead>
              <tr>
                <th>
                  {categoryUnits[from].name}
                </th>

                <th>
                  {categoryUnits[to].name}
                </th>
              </tr>
            </thead>

            <tbody>

              {values.map(value => {

                const converted =
                  convertUnit(
                    value,
                    from,
                    to,
                    category
                  );

                return (
                  <tr key={value}>

                    <td>
                      {value}{" "}
                      <Symbol unit={categoryUnits[from]} />
                    </td>

                    <td>
                      {format(converted)}{" "}
                      <Symbol unit={categoryUnits[to]} />
                    </td>

                  </tr>
                );

              })}

            </tbody>

          </table>

        </div>

      </section>
    </>
  );
}
