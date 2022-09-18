import { TwistyPlayer, TwistyPlayerConfig } from "cubing/twisty";
import { algHelpers, data } from "./data";

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
// let activeRow: HTMLElement | null = null;
let activeRow: HTMLTableElement | null = null;

interface AlgInfo {
	alg: string;
	setupAlg: string;
	hashOLLName: string;
	config: string;
}

function algs(coName: string): AlgInfo[] {
	const algInfos: AlgInfo[] = [];
	for (const eoName of Object.keys(algHelpers.EDGES)) {
		const hashOLLName = coName + eoName;
		const alg = localStorage[hashOLLName];
		const setupAlg = algHelpers.CORNERS[coName] + algHelpers.EDGES[eoName];
		algInfos.push({
			hashOLLName,
			alg,
			setupAlg,
			config: "OLL",
		});
	}
	return algInfos;
}

console.log(algs("O"));

function addAlgSheet(coName: string): void {
	const algSheet = document.body.appendChild(
		document.createElement("alg-sheet"),
	);
	const grid = algSheet.appendChild(document.createElement("table"));
	grid.classList.add("table");
	for (const algInfo of algs(coName)) {
		const player = new TwistyPlayer({
			...getConfig(algInfo.config),
			// experimentalSetupAnchor: "end",
			alg: algInfo.setupAlg,
		});
		if (activeRow) {
			const algTD = activeRow.appendChild(document.createElement("div"));
			algTD.classList.add("alg", "right");
			algTD.textContent = algInfo.alg;
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
			hashOLLTextWrapper.textContent = `#${algInfo.hashOLLName}`;
			activeRow = null;
		} else {
			const activeRoww = grid; // table.appendChild(document.createElement("tr"));
			activeRow = activeRoww;
			// const hashOLLTD = activeRow.appendChild(document.createElement("div"));
			const hashOLLTextWrapper = activeRoww.appendChild(
				document.createElement("div"),
			);
			hashOLLTextWrapper.classList.add("hash-oll");
			hashOLLTextWrapper.classList.add("cw");
			hashOLLTextWrapper.textContent = `#${algInfo.hashOLLName}`;

			const playerTD = activeRoww.appendChild(document.createElement("div"));
			// const playerWrapper = playerTD.appendChild(
			// 	document.createElement("twisty-player-wrapper"),
			// );
			playerTD.appendChild(player);
			const algTD = activeRoww.appendChild(document.createElement("div"));
			algTD.classList.add("alg");
			algTD.textContent = algInfo.alg;
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
}

for (const coName of Object.keys(algHelpers.CORNERS)) {
	addAlgSheet(coName);
}
