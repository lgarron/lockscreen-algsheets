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
const table = document.querySelector("alg-sheet table")!;
let activeRow: HTMLTableRowElement | null = null;

for (const [alg, info] of Object.entries(data.algs)) {
	const player = new TwistyPlayer({ ...getConfig(info.config), alg });
	if (activeRow) {
		const playerTD = activeRow.appendChild(document.createElement("td"));
		const playerWrapper = playerTD.appendChild(
			document.createElement("twisty-player-wrapper"),
		);
		playerWrapper.appendChild(player);
		playerTD.rowSpan = 2;
		const tr = table.appendChild(document.createElement("tr"));
		tr.appendChild(document.createElement("td")).textContent = alg;
		activeRow = null;
	} else {
		activeRow = table.appendChild(document.createElement("tr"));
		const playerTD = activeRow.appendChild(document.createElement("td"));
		const playerWrapper = playerTD.appendChild(
			document.createElement("twisty-player-wrapper"),
		);
		playerWrapper.appendChild(player);
		playerTD.rowSpan = 2;
		activeRow.appendChild(document.createElement("td")).textContent = alg;
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
