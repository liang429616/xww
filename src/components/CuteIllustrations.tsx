type IllustrationProps = {
  className?: string;
};

export function Rainbow({ className = "" }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 520 300" aria-hidden="true">
      <path d="M45 270a215 215 0 0 1 430 0" fill="none" stroke="#f49aa7" strokeWidth="46" strokeLinecap="round" />
      <path d="M85 270a175 175 0 0 1 350 0" fill="none" stroke="#ffc779" strokeWidth="40" strokeLinecap="round" />
      <path d="M122 270a138 138 0 0 1 276 0" fill="none" stroke="#ffe595" strokeWidth="38" strokeLinecap="round" />
      <path d="M158 270a102 102 0 0 1 204 0" fill="none" stroke="#9ddbb3" strokeWidth="36" strokeLinecap="round" />
      <path d="M193 270a67 67 0 0 1 134 0" fill="none" stroke="#9bcdec" strokeWidth="34" strokeLinecap="round" />
    </svg>
  );
}

export function Cloud({ className = "" }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 250 120" aria-hidden="true">
      <path d="M43 96c-22 0-35-13-35-31 0-20 16-34 38-32C55 11 75 1 98 9c17 6 27 19 29 36 9-10 22-15 36-11 15 4 24 16 25 30 4-2 9-3 14-3 22 0 40 14 40 33 0 10-4 18-11 24H36A35 35 0 0 1 43 96Z" fill="#fffdf8" />
      <path d="M48 102h169" fill="none" stroke="#eeded7" strokeWidth="5" strokeLinecap="round" opacity=".7" />
    </svg>
  );
}

export function Bunny({ className = "" }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 250 330" aria-hidden="true">
      <ellipse cx="92" cy="63" rx="30" ry="72" fill="#fff8e9" transform="rotate(-12 92 63)" />
      <ellipse cx="160" cy="61" rx="29" ry="71" fill="#fff8e9" transform="rotate(12 160 61)" />
      <ellipse cx="95" cy="61" rx="12" ry="48" fill="#f7bdc4" transform="rotate(-12 95 61)" />
      <ellipse cx="157" cy="59" rx="11" ry="47" fill="#f7bdc4" transform="rotate(12 157 59)" />
      <ellipse cx="126" cy="149" rx="82" ry="77" fill="#fff8e9" />
      <ellipse cx="125" cy="266" rx="71" ry="77" fill="#fff8e9" />
      <ellipse cx="72" cy="274" rx="26" ry="61" fill="#fff8e9" transform="rotate(20 72 274)" />
      <ellipse cx="180" cy="274" rx="26" ry="61" fill="#fff8e9" transform="rotate(-20 180 274)" />
      <circle cx="95" cy="143" r="6" fill="#5e4a47" />
      <circle cx="157" cy="143" r="6" fill="#5e4a47" />
      <circle cx="78" cy="165" r="13" fill="#f8bdc4" opacity=".65" />
      <circle cx="174" cy="165" r="13" fill="#f8bdc4" opacity=".65" />
      <path d="M120 156q6-6 12 0-6 9-12 0Z" fill="#dc909a" />
      <path d="M126 165q-10 12-22 2M126 165q10 12 22 2" fill="none" stroke="#705652" strokeWidth="3" strokeLinecap="round" />
      <path d="M82 218q43 31 87 0v56q-44 25-87 0Z" fill="#f39aa8" />
      <path d="M81 222q44 26 89 0" fill="none" stroke="#fff5e8" strokeWidth="7" strokeDasharray="8 9" />
      <path d="M106 189q19 22 39 0" fill="none" stroke="#6f5450" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Bear({ className = "" }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 270 330" aria-hidden="true">
      <circle cx="69" cy="79" r="42" fill="#bd8059" />
      <circle cx="201" cy="79" r="42" fill="#bd8059" />
      <circle cx="69" cy="79" r="20" fill="#e7b98f" />
      <circle cx="201" cy="79" r="20" fill="#e7b98f" />
      <circle cx="135" cy="143" r="91" fill="#c88960" />
      <ellipse cx="135" cy="271" rx="78" ry="83" fill="#c88960" />
      <ellipse cx="135" cy="164" rx="42" ry="35" fill="#e9bd91" />
      <circle cx="103" cy="137" r="6" fill="#53413d" />
      <circle cx="168" cy="137" r="6" fill="#53413d" />
      <ellipse cx="135" cy="154" rx="11" ry="8" fill="#67473d" />
      <path d="M135 162q-9 13-21 4M135 162q9 13 21 4" fill="none" stroke="#67473d" strokeWidth="3" strokeLinecap="round" />
      <circle cx="84" cy="164" r="13" fill="#e99a93" opacity=".62" />
      <circle cx="186" cy="164" r="13" fill="#e99a93" opacity=".62" />
      <path d="M63 231q72 42 144 0l-10 55q-62 30-124 0Z" fill="#7fbaaa" />
      <path d="M88 231l47 42 47-42" fill="#fff1ce" />
      <ellipse cx="76" cy="282" rx="28" ry="59" fill="#c88960" transform="rotate(18 76 282)" />
      <ellipse cx="196" cy="282" rx="28" ry="59" fill="#c88960" transform="rotate(-18 196 282)" />
    </svg>
  );
}

export function Cake({ className = "", candlesLit = false }: IllustrationProps & { candlesLit?: boolean }) {
  const candleX = [118, 164, 210, 256, 302];
  return (
    <svg className={className} viewBox="0 0 420 430" aria-hidden="true">
      <ellipse cx="210" cy="392" rx="184" ry="25" fill="#89b98a" opacity=".25" />
      <path d="M61 270h298v102c0 25-67 45-149 45S61 397 61 372Z" fill="#f39ba8" />
      <ellipse cx="210" cy="270" rx="149" ry="48" fill="#ffd7d9" />
      <path d="M83 275c14 26 29 1 45 28 19 31 35-17 57 13 20 27 37-15 60 3 23 18 30-21 54-5 18 12 29-4 38-27v50c-4 25-62 43-127 43S89 362 83 337Z" fill="#fff7e7" />
      <ellipse cx="210" cy="267" rx="130" ry="35" fill="#fff7e7" />
      {candleX.map((x, index) => (
        <g key={x}>
          <rect x={x} y={183 - (index % 2) * 9} width="12" height="78" rx="6" fill={index % 2 ? "#78beb1" : "#ffbd65"} />
          <path d={`M${x + 6} ${215 - (index % 2) * 9}l6 9M${x + 6} ${237 - (index % 2) * 9}l6 9`} stroke="#fff7e7" strokeWidth="4" />
          <path className={`cake-flame ${candlesLit ? "is-lit" : ""}`} d={`M${x + 6} ${171 - (index % 2) * 9}c-18-16 3-32 6-44 17 17 18 32-6 44Z`} fill="#ff9a54" />
        </g>
      ))}
      <circle cx="113" cy="290" r="9" fill="#f17587" />
      <circle cx="163" cy="306" r="8" fill="#ffc365" />
      <circle cx="220" cy="291" r="9" fill="#7bc1b3" />
      <circle cx="277" cy="307" r="8" fill="#f17587" />
      <circle cx="321" cy="286" r="9" fill="#ffc365" />
      <path d="M177 348q33 28 66 0" fill="none" stroke="#d77382" strokeWidth="5" strokeLinecap="round" />
      <circle cx="159" cy="341" r="6" fill="#664747" />
      <circle cx="261" cy="341" r="6" fill="#664747" />
      <circle cx="142" cy="356" r="13" fill="#f7bac0" />
      <circle cx="278" cy="356" r="13" fill="#f7bac0" />
    </svg>
  );
}

export function FlowerPatch({ className = "" }: IllustrationProps) {
  const flowers = [32, 94, 148, 210, 270, 334, 389];
  return (
    <svg className={className} viewBox="0 0 430 140" aria-hidden="true">
      {flowers.map((x, index) => (
        <g key={x} transform={`translate(${x} ${55 + (index % 3) * 16}) rotate(${index % 2 ? 8 : -8})`}>
          <path d="M0 12v64" stroke="#63a776" strokeWidth="5" strokeLinecap="round" />
          <path d="M0 42q-18-13-20 5 12 11 20 2M0 53q17-12 21 5-11 11-21 3" fill="#8ac48e" />
          <circle cx="0" cy="0" r="11" fill={index % 2 ? "#ffadba" : "#ffe082"} />
          <circle cx="-10" cy="-2" r="9" fill={index % 2 ? "#ffc7cf" : "#fff0a9"} />
          <circle cx="9" cy="-4" r="9" fill={index % 2 ? "#ffc7cf" : "#fff0a9"} />
          <circle cx="0" cy="0" r="5" fill="#fff8db" />
        </g>
      ))}
    </svg>
  );
}
