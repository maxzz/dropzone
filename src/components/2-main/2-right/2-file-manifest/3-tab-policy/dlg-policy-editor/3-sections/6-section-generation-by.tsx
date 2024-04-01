import { useAtom } from "jotai";
import { Atomize } from "@/hooks/atomsX";
import { UseAs } from "@/store/manifest";
import { PolicyUi } from "../1-create-ui-atoms";
import { Radio } from "../4-constrols";

export function SectionGenerationBy({ atoms }: { atoms: Atomize<PolicyUi>; }) {
    const [useAs, setUseUs] = useAtom(atoms.useAsAtom);
    return (
        <div className="grid space-y-2">
            <Radio name="gen-type" checked={useAs === `${UseAs.verify}`} onChange={() => setUseUs(`${UseAs.verify}`)}>
                By user
            </Radio>

            <Radio name="gen-type" checked={useAs === `${UseAs.generate}`} onChange={() => setUseUs(`${UseAs.generate}`)}>
                By system
            </Radio>
        </div>
    );
}