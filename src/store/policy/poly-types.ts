export enum ConstrainSet { // former CharsetType
    alphanumeric,		// TODO: describe
    alpha,				// TODO: describe
    numeric,			// TODO: describe
    withspecial,		// TODO: describe
    atleastonenumber,	// TODO: describe
}

export enum ConstrainPsw {// former RESTRICTTYPE
    none,               // former none.         Nothing specified. former 'no_restrictions' // none,      // "None"
    diffWp,             // former different_wp. Different from window password.             // notWinPsw, // "Different than the Windows password"
    diffAp,             // former different_ap. Different from any password.                // notPmPsw,  // "Unique within Password Manager logons"
    diffPp,             // former different_pp. Different from previous password.           // notCurPsw, // "Different than the current password"
}

export enum UseAs {     // former PolicyType
    none,
    verify,				// TODO: describe; maybe as by user
    generate,			// TODO: describe; maybe as by system
}

export type Policy = {
    useAs: UseAs;       // former type; generate or verify
    constrainSet: ConstrainSet; // former simpleChSet
    constrainsPsw: ConstrainPsw;
    minLen: number;     // min password length
    maxLen: number;     // max password length
    useExt: boolean;    // ? use customRule
    custom: string;     // customRule former policyExt
};

export const namesConstrainSet = [
    "Letters and numbers",
    "Numbers only",
    "Letters only",
    "Letters or numbers with special characters",
    "Letters or numbers with at least one number",
];

export const namesConstrainPsw = [
    "None",
    "Different than the Windows password",
    "Unique within Password Manager logons",
    "Different than the current password",
];

export const namesUseAs = [
    "Verify",
    "Generate",
];
