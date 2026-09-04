import "./SymbolsBackground.css";

const symbols = [
  "ruler","scale","compass","protractor","caliper","triangle",
  "square","circle","angle","dimension","cube","graph",
  "ruler2","scale2","compass2","protractor2","caliper2",
  "triangle2","dimension2","cube2","angle2","graph2",
  "ruler3","scale3","compass3","protractor3","caliper3",
  "triangle3","square3","circle3","angle3","dimension3",
  "cube3","graph3","ruler4","scale4","compass4","protractor4",
  "caliper4","triangle4","dimension4","cube4","angle4","graph4",

  "clock","thermometer","beaker","flask","droplet","lightning",
  "atom","gauge","speedometer","weight","tape","measuringCylinder",
  "fraction","percent","degree","pi","sigma","approx","notEqual",
  "math","axes","grid","hexagon","cylinder","sphere","cone",
  "pyramid","nut","gear","screw","level","vernier"
];

function Symbol({ type, index }) {
  const lifeDuration = 9 + ((index * 7) % 8);
  const driftDuration = 75 + ((index * 37) % 86);
  const delay = -((index * 17) % 19);

  const x = (index * 17) % 96;
  const y = (index * 29) % 92;
  const size = 24 + ((index * 13) % 46);

  const textSymbols = {
    fraction: "½",
    percent: "%",
    degree: "°",
    pi: "p",
    sigma: "S",
    approx: "˜",
    notEqual: "?",
    math: "±×÷"
  };

  return (
    <div
      className="floating-symbol"
      style={{
        "--x": `${x}%`,
        "--y": `${y}%`,
        "--size": `${size}px`,
        "--life-duration": `${lifeDuration}s`,
        "--drift-duration": `${driftDuration}s`,
        "--delay": `${delay}s`
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100">

        {(type.startsWith("ruler")) && (
          <>
            <rect x="15" y="35" width="70" height="30" rx="2" />
            <path d="M25 35v12M35 35v8M45 35v12M55 35v8M65 35v12M75 35v8" />
          </>
        )}

        {(type.startsWith("scale")) && (
          <>
            <path d="M50 18v58M30 76h40M22 28h56M18 28l-10 30h20zM82 28l-10 30h20z" />
            <circle cx="50" cy="18" r="5" />
          </>
        )}

        {(type.startsWith("compass")) && (
          <>
            <circle cx="50" cy="50" r="32" />
            <path d="M50 18v64M18 50h64M50 24l7 26-7 26-7-26z" />
          </>
        )}

        {(type.startsWith("protractor")) && (
          <>
            <path d="M12 72a38 38 0 0 1 76 0Z" />
            <path d="M20 72h60M25 63l-5-4M35 55l-3-7M50 52V40M65 55l3-7M75 63l5-4" />
          </>
        )}

        {(type.startsWith("caliper")) && (
          <>
            <path d="M25 18v64M25 25h42M67 25v55M25 80h25M50 55h17" />
            <path d="M25 25l-12-10M25 80l-12 10M67 25l12-10M67 80l12 10" />
          </>
        )}

        {(type.startsWith("triangle")) && (
          <>
            <path d="M18 78L50 18l32 60Z" />
            <path d="M25 72h20v-18M45 72l20-37" />
          </>
        )}

        {(type.startsWith("square")) && (
          <>
            <rect x="22" y="22" width="56" height="56" />
            <path d="M22 15v7M78 15v7M15 22h7M15 78h7M78 22h7M78 78h7" />
          </>
        )}

        {(type.startsWith("circle")) && (
          <>
            <circle cx="50" cy="50" r="31" />
            <circle cx="50" cy="50" r="5" />
            <path d="M50 12v12M50 76v12M12 50h12M76 50h12" />
          </>
        )}

        {(type.startsWith("angle")) && (
          <>
            <path d="M20 78L50 25l30 53" />
            <path d="M35 78a25 25 0 0 1 30 0" />
          </>
        )}

        {(type.startsWith("dimension")) && (
          <>
            <path d="M18 25v50M82 25v50M18 50h64" />
            <path d="M18 50l12-7M18 50l12 7M82 50L70 43M82 50l-12 7" />
          </>
        )}

        {(type.startsWith("cube")) && (
          <>
            <path d="M50 15l30 18v35L50 85 20 68V33Z" />
            <path d="M50 15v35M20 33l30 17 30-17M50 50v35" />
          </>
        )}

        {(type.startsWith("graph")) && (
          <>
            <path d="M18 82V18M18 82h64" />
            <path d="M25 68l15-20 12 10 20-30" />
            <circle cx="25" cy="68" r="3" />
            <circle cx="40" cy="48" r="3" />
            <circle cx="52" cy="58" r="3" />
            <circle cx="72" cy="28" r="3" />
          </>
        )}

        {type === "clock" && (
          <>
            <circle cx="50" cy="50" r="32" />
            <path d="M50 25v25l16 10" />
            <path d="M50 12v7M50 81v7M12 50h7M81 50h7" />
          </>
        )}

        {type === "thermometer" && (
          <>
            <path d="M45 20a8 8 0 0 1 16 0v38a18 18 0 1 1-16 0Z" />
            <path d="M53 30v35" />
            <circle cx="53" cy="76" r="9" />
            <path d="M65 32h10M65 44h7M65 56h10" />
          </>
        )}

        {type === "beaker" && (
          <>
            <path d="M35 18h30M40 18v18L25 78h50L60 36V18" />
            <path d="M30 62h40M34 52h32" />
          </>
        )}

        {type === "flask" && (
          <>
            <path d="M42 18h16M44 18v25L25 78h50L56 43V18" />
            <path d="M31 63h38M36 54h28" />
          </>
        )}

        {type === "droplet" && (
          <>
            <path d="M50 14C50 14 25 43 25 61a25 25 0 0 0 50 0C75 43 50 14 50 14Z" />
            <path d="M39 66a12 12 0 0 0 12 10" />
          </>
        )}

        {type === "lightning" && (
          <path d="M58 10L27 54h22L42 90l31-47H51Z" />
        )}

        {type === "atom" && (
          <>
            <ellipse cx="50" cy="50" rx="38" ry="16" />
            <ellipse cx="50" cy="50" rx="38" ry="16" transform="rotate(60 50 50)" />
            <ellipse cx="50" cy="50" rx="38" ry="16" transform="rotate(120 50 50)" />
            <circle cx="50" cy="50" r="6" />
          </>
        )}

        {type === "gauge" && (
          <>
            <path d="M18 68a32 32 0 0 1 64 0" />
            <path d="M50 68l18-25" />
            <circle cx="50" cy="68" r="5" />
            <path d="M24 58l6 3M32 42l5 5M50 36v8M68 42l-5 5M76 58l-6 3" />
          </>
        )}

        {type === "speedometer" && (
          <>
            <path d="M16 72a34 34 0 0 1 68 0" />
            <path d="M50 72l23-31" />
            <circle cx="50" cy="72" r="5" />
            <path d="M25 59l5 3M35 45l4 5M50 40v7M65 45l-4 5M75 59l-5 3" />
          </>
        )}

        {type === "weight" && (
          <>
            <path d="M37 38h26l12 42H25Z" />
            <path d="M42 38a8 8 0 0 1 16 0" />
            <path d="M32 68h36" />
          </>
        )}

        {type === "tape" && (
          <>
            <circle cx="50" cy="50" r="30" />
            <circle cx="50" cy="50" r="10" />
            <path d="M50 20v20M50 60v20M20 50h20M60 50h20" />
          </>
        )}

        {type === "measuringCylinder" && (
          <>
            <path d="M35 15h30M38 15v65h24V15" />
            <path d="M42 30h10M42 42h10M42 54h10M42 66h10M42 24h6M42 36h6M42 48h6M42 60h6" />
            <path d="M38 62h24" />
          </>
        )}

        {type === "axes" && (
          <>
            <path d="M50 85V15M15 50h70" />
            <path d="M50 15l-5 8M50 15l5 8M85 50l-8-5M85 50l-8 5" />
          </>
        )}

        {type === "grid" && (
          <>
            <rect x="20" y="20" width="60" height="60" />
            <path d="M35 20v60M50 20v60M65 20v60M20 35h60M20 50h60M20 65h60" />
          </>
        )}

        {type === "hexagon" && (
          <path d="M30 18h40l20 32-20 32H30L10 50Z" />
        )}

        {type === "cylinder" && (
          <>
            <ellipse cx="50" cy="22" rx="27" ry="10" />
            <path d="M23 22v56M77 22v56" />
            <ellipse cx="50" cy="78" rx="27" ry="10" />
          </>
        )}

        {type === "sphere" && (
          <>
            <circle cx="50" cy="50" r="32" />
            <ellipse cx="50" cy="50" rx="32" ry="12" />
            <path d="M50 18a32 32 0 0 0 0 64M50 18a32 32 0 0 1 0 64" />
          </>
        )}

        {type === "cone" && (
          <>
            <path d="M50 15L22 78M50 15l28 63" />
            <ellipse cx="50" cy="78" rx="28" ry="9" />
          </>
        )}

        {type === "pyramid" && (
          <>
            <path d="M50 15L18 78h64Z" />
            <path d="M50 15v63M18 78l32-20 32 20" />
          </>
        )}

        {type === "nut" && (
          <>
            <path d="M30 20h40l15 30-15 30H30L15 50Z" />
            <circle cx="50" cy="50" r="15" />
          </>
        )}

        {type === "gear" && (
          <>
            <circle cx="50" cy="50" r="20" />
            <circle cx="50" cy="50" r="7" />
            <path d="M50 12v12M50 76v12M12 50h12M76 50h12M23 23l9 9M68 68l9 9M77 23l-9 9M32 68l-9 9" />
          </>
        )}

        {type === "screw" && (
          <>
            <path d="M30 25l45 45M24 35l22-22M54 78l22-22" />
            <path d="M35 27l8-8M42 34l8-8M49 41l8-8M56 48l8-8M63 55l8-8" />
            <path d="M24 35l-7 7M30 41l-7 7M36 47l-7 7" />
          </>
        )}

        {type === "level" && (
          <>
            <rect x="15" y="35" width="70" height="30" rx="5" />
            <circle cx="50" cy="50" r="9" />
            <path d="M22 35v30M78 35v30" />
          </>
        )}

        {type === "vernier" && (
          <>
            <path d="M18 25h64M18 75h64M25 25v50M75 25v50" />
            <path d="M32 25v14M38 25v9M44 25v14M50 25v9M56 25v14M62 25v9M68 25v14" />
            <path d="M32 75v-14M38 75v-9M44 75v-14M50 75v-9M56 75v-14M62 75v-9M68 75v-14" />
            <path d="M25 50h50" />
          </>
        )}

        {textSymbols[type] && (
          <text
            x="50"
            y="65"
            textAnchor="middle"
            fontSize={type === "math" ? "25" : "48"}
            fontFamily="serif"
            fill="currentColor"
            stroke="none"
          >
            {textSymbols[type]}
          </text>
        )}
      </svg>
    </div>
  );
}

export default function SymbolsBackground() {
  const allSymbols = [...symbols, ...symbols];

  return (
    <div className="symbol-field" aria-hidden="true">
      {allSymbols.map((symbol, index) => (
        <Symbol
          key={`${symbol}-${index}`}
          type={symbol}
          index={index}
        />
      ))}
    </div>
  );
}




