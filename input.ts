import { Alg } from "cubing/alg";
import { KeyboardPuzzle } from "cubing/bluetooth";
import { KState } from "cubing/kpuzzle";
import { cube3x3x3 } from "cubing/puzzles";
import "cubing/twisty";
import { TwistyPlayer } from "cubing/twisty";

const player = document.body.appendChild(
	new TwistyPlayer({
		controlPanel: "none",
	}),
);
player.tabIndex = 0;
player.focus();
const kbp = new KeyboardPuzzle(player);
kbp.addAlgLeafListener((e) => {
	player.experimentalAddAlgLeaf(e.latestAlgLeaf);
});

const algHelpers = {
	CORNERS: {
		S: "R U2' R' U' R U' R'",
		A: "R U R' U R U2 R'",
		H: "U R U2' R' U' R U R' U' R U' R' U'",
		L: "U' R U2' R' U' R U R' U' R U R' U' R U' R' U",
		P: "B U2 B2 U' B2 U' B2 U2' B",
		T: "U2 L' U2' L U L' U L R U2 R' U' R U' R' U' U2",
		U: "U U R U R' U R U2' R' L' U' L U' L' U2 L U' U' U'",
		O: "",
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
for (const AUF of [".", "U", "U2", "U'"]) {
	const aufTransformation = kpuzzle.algToTransformation(
		Alg.fromString(AUF),
	).invert();
	for (const [eoName, eoAlg] of Object.entries(algHelpers.EDGES)) {
		const edgeTransformation = aufTransformation.applyAlg(
			Alg.fromString(eoAlg).invert(),
		);
		for (const [coName, coAlg] of Object.entries(algHelpers.CORNERS)) {
			const ollTransformation = edgeTransformation.applyAlg(
				Alg.fromString(coAlg).invert(),
			);
			const oriHash = toOriHash(ollTransformation.invert().toKState());
			const hashOLLName = `#${coName}${eoName}`;
			console.log(`${AUF} #${hashOLLName}`, oriHash);
			OLLs[oriHash] ??= { name: hashOLLName, AUF };
		}
	}
}

console.log(Object.keys(OLLs).length);

async function computeOLL() {
	const state = await player.experimentalModel.currentState.get();
	const oriHash = toOriHash(state);
	console.log();
	console.log(OLLs[oriHash]);
}

const button = document.body.appendChild(document.createElement("button"));
button.textContent = "Compute!";
button.addEventListener("click", computeOLL);
