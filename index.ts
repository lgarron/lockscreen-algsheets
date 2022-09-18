import { TwistyPlayer, TwistyPlayerConfig } from "cubing/twisty";
import { data } from "./data";

function getConfig(configName?: string): TwistyPlayerConfig {
	if (!configName) {
		return {};
	}
	let config = data.configs[configName];
	if (config.inheritFrom) {
		config = { ...getConfig(config.inheritFrom), ...config };
		// rome-ignore lint(js/noDelete): We're removing a field!
		delete config.inheritFrom;
	}
	return config;
}

console.log(getConfig("OLL"));
const table = document.querySelector("alg-sheet .table") as HTMLTableElement;
// let activeRow: HTMLElement | null = null;
let activeRow: HTMLTableElement | null = null;

for (const [alg, info] of Object.entries(data.algs)) {
	const player = new TwistyPlayer({ ...getConfig(info.config), alg });
	if (activeRow) {
		const algTD = activeRow.appendChild(document.createElement("div"));
		algTD.classList.add("alg", "right");
		algTD.textContent = alg;
		const playerTD = activeRow.appendChild(document.createElement("div"));
		// const playerWrapper = playerTD.appendChild(
		// 	document.createElement("twisty-player-wrapper"),
		// );
		playerTD.appendChild(player);
		// const hashOLLTD = activeRow.appendChild(document.createElement("div"));
		const hashOLLTextWrapper = activeRow.appendChild(
			document.createElement("div"),
		);
		hashOLLTextWrapper.classList.add("hash-oll");
		hashOLLTextWrapper.textContent = "#URF";
		activeRow = null;
	} else {
		const activeRoww = table; // table.appendChild(document.createElement("tr"));
		activeRow = activeRoww;
		// const hashOLLTD = activeRow.appendChild(document.createElement("div"));
		const hashOLLTextWrapper = activeRoww.appendChild(
			document.createElement("div"),
		);
		hashOLLTextWrapper.classList.add("hash-oll");
		hashOLLTextWrapper.classList.add("cw");
		hashOLLTextWrapper.textContent = "#URF";

		const playerTD = activeRoww.appendChild(document.createElement("div"));
		// const playerWrapper = playerTD.appendChild(
		// 	document.createElement("twisty-player-wrapper"),
		// );
		playerTD.appendChild(player);
		const algTD = activeRoww.appendChild(document.createElement("div"));
		algTD.classList.add("alg");
		algTD.textContent = alg;
	}
	// const algCase = algSheet.appendChild(document.createElement("alg-case"));
	// const twistyPlayerWrapper = algCase.appendChild(
	// 	document.createElement("twisty-player-wrapper"),
	// );
	// const player = twistyPlayerWrapper.appendChild(
	// 	,
	// );
	// algCase.append(alg);
}
