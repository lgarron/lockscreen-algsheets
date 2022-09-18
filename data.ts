import { type TwistyPlayerConfig } from "cubing/twisty";

interface ConfigWithInheritance extends TwistyPlayerConfig {
	inheritFrom?: string;
}

interface AlgsheetData {
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
