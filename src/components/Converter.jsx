import { useState } from "react";

function formatResult(value) {
  if (!Number.isFinite(value)) return "";
  return Number(value.toFixed(8)).toString();
}

export default function Converter({ conversion }) {
  const [value, setValue] = useState("");

  const result =
    value === ""
      ? ""
      : formatResult(conversion.convert(Number(value)));

  function swap() {
    window.location.href =
      `/${conversion.reverse}/`;
  }

  return (
    <>
      <div className="converter">

        <div className="converter-header">
          <div>
            <span className="eyebrow">
              {conversion.category.toUpperCase()}
            </span>

            <h1>
              {conversion.from} to {conversion.to}
            </h1>
          </div>

          <button
            className="swap-button"
            onClick={swap}
            aria-label="Swap units"
          >
            ?
          </button>
        </div>

        <div className="conversion-fields">

          <div className="field">
            <label>{conversion.from}</label>

            <div className="input-wrap">
              <input
                type="number"
                inputMode="decimal"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="0"
                autoFocus
              />

              <span>{conversion.symbolFrom}</span>
            </div>
          </div>

          <div className="equals">=</div>

          <div className="field">
            <label>{conversion.to}</label>

            <div className="result-wrap">
              <output>
                {result || "0"}
              </output>

              <span>{conversion.symbolTo}</span>
            </div>
          </div>

        </div>
      </div>

      <section className="content">

        <h2>
          {conversion.from} to {conversion.to}
        </h2>

        <p>
          {conversion.explanation}
        </p>

        <div className="formula">
          <strong>Formula:</strong>{" "}
          {conversion.formula}
        </div>

        <h2>
          {conversion.from} to {conversion.to} chart
        </h2>

        <table>
          <thead>
            <tr>
              <th>{conversion.from}</th>
              <th>{conversion.to}</th>
            </tr>
          </thead>

          <tbody>
            {conversion.examples.map(([from, to]) => (
              <tr key={from}>
                <td>
                  {from} {conversion.symbolFrom}
                </td>

                <td>
                  {to} {conversion.symbolTo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {conversion.faqs?.length > 0 && (
          <section className="faq">

            <h2>Frequently asked questions</h2>

            {conversion.faqs.map(faq => (
              <div
                className="faq-item"
                key={faq.question}
              >
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}

          </section>
        )}

      </section>
    </>
  );
}
