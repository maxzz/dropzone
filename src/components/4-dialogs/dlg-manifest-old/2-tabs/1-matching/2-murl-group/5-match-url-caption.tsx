import { type ComponentPropsWithoutRef } from "react";
import { type Matching } from "@/store/manifest";

export function MatchUrlInputLabel({ how, ...rest }: { how: Matching.How; } & ComponentPropsWithoutRef<"div">) {
    return (
        <div {...rest}>
            {names[how] || 'No way'}
        </div>
    );
}

const names = [
    /* 0 - undef           */ "Original url",
    /* 1 - makeDomainMatch */ "Match only domain of original url",
    /* 2 - regex           */ "Wildcard string",
    /* 3 - wildcard        */ "Regular expresssion",
    /* 4 - skipDomainMatch */ (<> Match original url <span className="text-xs">(url params will be ignored)</span> </>), // without params
];
