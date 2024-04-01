import { Atomize } from "@/hooks/atomsX";
import { PolicyUi } from "../1-create-ui-atoms";
import { Dropdown } from "../4-constrols";
import { namesConstrainPsw } from "@/store/manifest";

export function SectionHistory({ atoms }: { atoms: Atomize<PolicyUi>; }) {
    return (
        <div>
            <Dropdown items={namesConstrainPsw} valueAtom={atoms.constrainsPswAtom} />
        </div>
    );
}
