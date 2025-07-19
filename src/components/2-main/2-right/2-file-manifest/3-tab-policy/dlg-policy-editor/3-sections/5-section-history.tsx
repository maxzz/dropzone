import { type Atomize } from "@/utils";
import { namesConstrainPsw } from "@/store/manifest";
import { type PolicyUi } from "../0-all/0-create-ui-atoms";
import { Dropdown } from "../4-constrols";

export function SectionHistory({ atoms }: { atoms: Atomize<PolicyUi>; }) {
    return (
        <div>
            <Dropdown items={namesConstrainPsw} valueAtom={atoms.constrainsPswAtom} />
        </div>
    );
}
