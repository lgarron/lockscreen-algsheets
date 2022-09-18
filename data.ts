import { type TwistyPlayerConfig } from "cubing/twisty";

interface ConfigWithInheritance extends TwistyPlayerConfig {
	inheritFrom?: string;
}

export interface AlgsheetData {
	// dimensions: {width: number, height: number, padding: number, }
	configs: Record<string, ConfigWithInheritance>;
	algs: Record<string, { config?: string }>;
}

export const data: AlgsheetData = {
	configs: {
		default: {
			visualization: "experimental-2D-LL",
			controlPanel: "none",
			background: "none",
		},
		OLL: { inheritFrom: "default", experimentalStickering: "OLL" },
	},
	algs: {
		"R U R' U R U2' R'": { config: "OLL" },
		"R U2' R' U' R U' R'": { config: "OLL" },
		"R U2' R2' U' R2 U' R2' U2' R": { config: "OLL" },
		"R U R' U R U' R' U R U2' R'": { config: "OLL" },
		"R U R' U R U' R' U R U' R' U R U2' R'": { config: "OLL" },
		"R U R' U R U' R' U' R' F R U R U' R' F'": { config: "OLL" },
		"r U R' U' L' U R U' x'": { config: "OLL" },
	},
};

export const algHelpers = {
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
