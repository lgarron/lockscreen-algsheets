import { Alg } from "cubing/alg";
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

		let algTD: HTMLDivElement;
		let playerTD: HTMLDivElement;
		let hashOLLTextWrapper: HTMLDivElement;
		if (activeRow) {
			algTD = activeRow.appendChild(document.createElement("div"));
			algTD.classList.add("right");
			playerTD = activeRow.appendChild(document.createElement("div"));
			hashOLLTextWrapper = activeRow.appendChild(document.createElement("div"));
			activeRow = null;
		} else {
			const activeRoww = grid; // table.appendChild(document.createElement("tr"));
			activeRow = activeRoww;
			hashOLLTextWrapper = activeRoww.appendChild(
				document.createElement("div"),
			);
			hashOLLTextWrapper.classList.add("cw");
			playerTD = activeRoww.appendChild(document.createElement("div"));
			algTD = activeRoww.appendChild(document.createElement("div"));
		}

		algTD.classList.add("alg");
		algTD.textContent = algInfo.alg;
		if (algInfo.alg.length < 25) {
			algTD.classList.add("very-short");
		} else if (algInfo.alg.length < 40) {
			algTD.classList.add("short");
		}

		playerTD.appendChild(player);

		hashOLLTextWrapper.classList.add("hash-oll");
		hashOLLTextWrapper.textContent = `#${algInfo.hashOLLName}`;
		// const algCase = algSheet.appendChild(document.createElement("alg-case"));
		// const twistyPlayerWrapper = algCase.appendChild(
		// 	document.createElement("twisty-player-wrapper"),
		// );
		// const player = twistyPlayerWrapper.appendChild(
		// 	,
		// );
		// algCase.append(alg);
	}

	const bigPlayer = algSheet.appendChild(
		new TwistyPlayer({
			controlPanel: "none",
			background: "none",
			visualization: "experimental-2D-LL",
			experimentalStickering: "OLL",
			alg: Alg.fromString(algHelpers["CORNERS"][coName]).invert(),
		}),
	);
	bigPlayer.classList.add("big-player");
}

for (const coName of Object.keys(algHelpers.CORNERS)) {
	addAlgSheet(coName);
}
