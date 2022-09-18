import { Alg } from "cubing/alg";
import { KeyboardPuzzle } from "cubing/bluetooth";
import { KState } from "cubing/kpuzzle";
import { cube3x3x3 } from "cubing/puzzles";
import "cubing/twisty";
import { TwistyAlgViewer, TwistyPlayer } from "cubing/twisty";

const player = document.body.appendChild(
	new TwistyPlayer({
		controlPanel: "none",
		experimentalStickering: "OLL",
	}),
);
player.addEventListener("keydown", (e) => {
	switch (e.code) {
		case "Enter": {
			recordOLL();
			break;
		}
		case "Space": {
			player.alg = "";
			inversePlayer.alg = "";
		}
	}
});

const inversePlayer = document.body.appendChild(
	new TwistyPlayer({
		controlPanel: "none",
		experimentalStickering: "OLL",
	}),
);
player.tabIndex = 0;
player.focus();
const kbp = new KeyboardPuzzle(player);
kbp.addAlgLeafListener((e) => {
	player.experimentalAddAlgLeaf(e.latestAlgLeaf, {
		coalesce: true,
		puzzleSpecificAlgSimplificationInfo:
			cube3x3x3.puzzleSpecificAlgSimplificationInfo,
	});
	inversePlayer.experimentalModel.alg.set(
		(async () => (await player.experimentalModel.alg.get()).alg.invert())(),
	);
	inversePlayer.timestamp = "end";
});
document.body.appendChild(document.createElement("br"));
document.body.appendChild(document.createElement("br"));
document.body.appendChild(new TwistyAlgViewer({ twistyPlayer: player }));
document.body.appendChild(document.createElement("br"));
document.body.appendChild(document.createElement("br"));

const algHelpers = {
	CORNERS: {
		O: "",
		H: "U R U2' R' U' R U R' U' R U' R' U'",
		S: "R U2' R' U' R U' R'",
		A: "R U R' U R U2 R'",
		L: "U' R U2' R' U' R U R' U' R U R' U' R U' R' U",
		P: "B U2 B2 U' B2 U' B2 U2' B",
		U: "U U R U R' U R U2' R' L' U' L U' L' U2 L U' U' U'",
		T: "U2 L' U2' L U L' U L R U2 R' U' R U' R' U' U2",
	},
	EDGES: {
		O: "",
		D: "U M' U' R' U' R U M2' U' R' U M' R",
		FB: "r U R' U' M U R U' R'",
		RL: "U' r U R' U' M U R U' R' U",
		FR: "R U R' U' M' U R U' r'",
		RB: "U R U R' U' M' U R U' r' U'",
		BL: "U2 R U R' U' M' U R U' r' U2",
		FL: "U' R U R' U' M' U R U' r' U",
	},
};

function toOriHash(t: KState) {
	let hash = "C:";
	hash += t.stateData["CORNERS"].orientation.slice(0, 4).join("");
	hash += ",E:";
	hash += t.stateData["EDGES"].orientation.slice(0, 4).join("");
	return hash;
}

const OLLs: Record<string, { name: string; AUF: string }> = {};
const kpuzzle = await cube3x3x3.kpuzzle();
for (const [eoName, eoAlg] of Object.entries(algHelpers.EDGES)) {
	const edgeTransformation = kpuzzle.algToTransformation(
		Alg.fromString(eoAlg).invert(),
	);
	for (const [coName, coAlg] of Object.entries(algHelpers.CORNERS)) {
		const ollTransformation = edgeTransformation.applyAlg(
			Alg.fromString(coAlg).invert(),
		);
		for (const AUF of [".", "U", "U2", "U'"]) {
			const aufTransformation = kpuzzle.algToTransformation(
				Alg.fromString(AUF),
			).invert();
			const oriHash = toOriHash(
				aufTransformation.applyTransformation(
					ollTransformation,
				).invert().toKState(),
			);
			const hashOLLName = `${coName}${eoName}`;
			// console.log(`${AUF} ${hashOLLName}`, oriHash);
			OLLs[oriHash] ??= { name: hashOLLName, AUF };
		}
	}
}

// console.log(Object.keys(OLLs).length);

// const button = document.body.appendChild(document.createElement("button"));
// button.textContent = "Compute!";
// button.addEventListener("click", recordOLL);

function getStored(hashName: string): string | null {
	return localStorage[hashName] ?? null;
}

function setStored(hashName: string, alg: string): void {
	localStorage[hashName] = alg;
	document.getElementById(
		hashName,
	)!.textContent = `${alg.toString()} #${hashName}`;
}

const table = document.body.appendChild(document.createElement("table"));
for (const co of Object.keys(algHelpers.CORNERS)) {
	const tr = table.appendChild(document.createElement("tr"));
	for (const eo of Object.keys(algHelpers.EDGES)) {
		const td = tr.appendChild(document.createElement("td"));
		const hashName = co + eo;
		td.id = hashName;
		td.textContent = `${getStored(hashName) ?? ""} #${hashName}`;
	}
}

async function recordOLL() {
	let [state, { alg }] = await Promise.all([
		player.experimentalModel.currentState.get(),
		player.experimentalModel.alg.get(),
	]);
	const oriHash = toOriHash(
		state.experimentalToTransformation()!.invert().toKState(),
	);
	// console.log();
	const lookup = OLLs[oriHash];
	console.log(oriHash, lookup, alg);
	// localStorage[lookup.name] ??= `${lookup.AUF} ${alg}`;
	setStored(
		lookup.name,
		`${lookup.AUF !== "." ? `(${lookup.AUF}) ` : ""}${alg}`,
	);
}
