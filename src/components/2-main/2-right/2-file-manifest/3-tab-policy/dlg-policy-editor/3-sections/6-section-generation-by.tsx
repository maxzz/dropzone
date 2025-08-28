import { useAtom } from "jotai";
import { type Atomize } from "@/utils";
import { Poli } from "@/store/manifest";
import { type PolicyUi } from "../0-all/0-create-ui-atoms";
import { Radio } from "../4-constrols";

export function SectionGenerationBy({ atoms }: { atoms: Atomize<PolicyUi>; }) {
    const [useAs, setUseUs] = useAtom(atoms.useAsAtom);
    return (
        <div className="grid space-y-2">
            <Radio name="gen-type" checked={useAs === `${Poli.UseAs.verify}`} onChange={() => setUseUs(`${Poli.UseAs.verify}`)}>
                By user
            </Radio>

            <Radio name="gen-type" checked={useAs === `${Poli.UseAs.generate}`} onChange={() => setUseUs(`${Poli.UseAs.generate}`)}>
                By system
            </Radio>
        </div>
    );
}
