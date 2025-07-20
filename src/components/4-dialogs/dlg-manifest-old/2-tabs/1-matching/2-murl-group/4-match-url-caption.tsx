import { classNames } from "@/utils";
import { Matching } from "@/store/manifest";

export function MatchUrlInputLabel({ how, disabled }: { how: Matching.How; disabled: boolean; }) {
    return (
        <div className={classNames('mt-1 mb-1', disabled && 'opacity-50')}>
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
