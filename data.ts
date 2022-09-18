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

export const storedAlgs = {
	UFR: "R U R' U R U2' R' F R U R' U' F'",
	PFB: "(U') R' U' R U' R' d R' U l U x",
	PRL: "(U') F U R U' R' U R U' R' F'",
	OFR: "r U R' U' M U R U' R'",
	TRL: "(U') R U R' U' R' F R F'",
	UBL: "(U2) R' U' F' U F R",
	LD: "(U') R U R' U R' F R F' U2' R' F R F'",
	TRB: "(U2) F' L F L' U' L' U' L U L' U L",
	HBL: "// same as #HFR",
	SBL: "M R U R' U R U2' R' U M'",
	AFL: "r U2' R' U' R U' r'",
	LFL: "(U) R U2' R2' F R F' R U2' R'",
	ABL: "(U') M' R' U' R U' R' U2 R U' M",
	LBL: "(U') L' U' L U' L' U L U L F' L' F",
	AO: "R U2' R' U' R U' R'",
	PRB: "(U) F R U R' U' R U R' U' F'",
	ORL: "// same as #OFB",
	AD: "f R U R' U' f' U F R U R' U' F'",
	LRB: "(U) F R U' R' U' R U R' F'",
	SRB: "(U') r' U2' R U R' U r",
	UFL: "(U2) R' U' R U' R' U2 R F R U R' U' F'",
	AFB: "r U M U R' U' r U' r'",
	HRL: "(U) r U r' U R U' R' U R U' M' U' r'",
	AFR: "(U') r' U' R U' R' U2 r",
	ORB: "// same as #OFR",
	UD: "r' U' R U' R' U2 r2 U R' U R U2' r'",
	SO: "R U R' U R U2' R'",
	OFB: "R U R' U' M' U R U' r'",
	TBL: "(U2) F R' F' R U R U R' U' R U' R'",
	SFR: "r U R' U R U2' r'",
	SRL: "(U) F R U R' U' F' . R' U2 R U R' U R",
	TFR: "F R' F R2 U' R' U' R U R' F2",
	PO: "(U) R U2' R2' U' R2 U' R2' U2' R",
	URL: "(U') F R U R' U' F'",
	LFR: "R U R' U R U' R' U' R' F R F'",
	OD: "M' U' R' U' R U M2' U' R' U r",
	HFL: "// same as #HRB",
	URB: "(U) F U R U' R' F'",
	SD: "(U') f R U R' U' f' U' F R U R' U' F'",
	LFB: "L F' L' U' L U F U' L'",
	PBL: "(U') F' L' U' L U L' U' L U F",
	OFL: "// same as #OFR",
	TFL: "F' L F' L2' U L U L' U' L F2",
	"#SO": ". [object Object]",
	HO: "R U2 R' U' R U R' U' R U' R'",
	HFB: "R' F R U R U' R' U' U R' F' R2 U' R' U R U R'",
	ARL: "(U') R U R' U' R' F R F' R U2' R' U' R U' R'",
	SFB: "R U R' U' R' F R F' . R U R' U R U2' R'",
	PFL: "(U') l' U l2 U' l2' U' l2 U l'",
	UFB: "(U) R' U' R' F R F' U R",
	PFR: "(U') l U' l2' U l2 U l2' U' l",
	LO: "(U) R' F R U R' U' R' F' R U R",
	HFR: "(U) r U R' U R U' R' U R U2' r'",
	HRB: "(U') r' U' R U' R' U R U' R' U2 r",
	TO: "(U) R' U' R' F R U R U' R' F' R",
	HD: "(U) R U2' R2' F R F' U2' R' F R F'",
	ARB: "(U) R' U' R y L F' L' U L F L'",
	TD: "r U2' R' U' R U' r2' U2' R U R' U r",
	OBL: "// same as #OFR",
	LRL: "(U') R' F R U R' U' F' U R",
	TFB: "R U R' d' R' F' r U M",
	SFL: "(U2) R U R' y R' F R U' R' F' R",
	UO: "(U) R U R' U R U' R' U' R' F R U R U' R' F'",
	PD: "(U) F R U R' U' S R U R' U' f'",
	OO: "// solved",
};
