import type { Language     } from "github-top-languages-lib/types.js";
import { generateChartData } from "github-top-languages-lib/render/chart.js";
import { renderSvg         } from "github-top-languages-lib/render/svg.js";
import { THEMES            } from "github-top-languages-lib/constants/themes.js";
import { DEFAULT_CONFIG    } from "github-top-languages-lib/constants/config.js";

const DEFAULT_LANGUAGES: Language[] = [
  { lang: "TypeScript", pct: 40.0 },
  { lang: "JavaScript", pct: 25.0 },
  { lang: "CSS",        pct: 15.0 },
  { lang: "HTML",       pct: 12.0 },
  { lang: "Python",     pct: 8.0  },
];

function renderChart(languages: Language[]): void {
  const preview = document.getElementById("chart-preview");
  if (!preview) return;

  const theme  = THEMES.default;
  const result = generateChartData(languages, theme, "donut", DEFAULT_CONFIG.WIDTH, false);
  const svg    = renderSvg(
    DEFAULT_CONFIG.WIDTH,
    DEFAULT_CONFIG.HEIGHT,
    theme.bg,
    result.segments,
    result.legend,
    DEFAULT_CONFIG.TITLE,
    theme.text
  );

  preview.innerHTML = svg;
  const svgEl = preview.querySelector("svg");
  if (svgEl) {
    svgEl.setAttribute("viewBox", `0 0 ${DEFAULT_CONFIG.WIDTH} ${DEFAULT_CONFIG.HEIGHT}`);
    svgEl.setAttribute("width", "100%");
    svgEl.removeAttribute("height");
  }
}

renderChart(DEFAULT_LANGUAGES);
