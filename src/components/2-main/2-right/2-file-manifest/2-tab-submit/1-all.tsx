import { useEffect, useState } from "react";
import { FieldTyp, Meta, SUBMIT } from "@/store/manifest";
import { RadioGroup } from "./2-radio-group";
import { createUiAtoms, debouncedCombinedResultFromAtoms } from "./0-create-ui-atoms";

export function ManiSection2_Submit({ form }: { form: Meta.Form; }) {

    const [items, setItems] = useState<string[]>([]);
    const [selected, setSelected] = useState(0);

    const atoms = useState(
        () => createUiAtoms(form,
            ({ get, set }) => {
                debouncedCombinedResultFromAtoms(atoms, get, set);
            }
        )
    )[0]; //TODO: not used yet

    useEffect(() => {
        const isWeb = !!form?.mani.detection.web_ourl;

        const submits = form?.fields?.filter((field) => field.ftyp === FieldTyp.button || field.mani.submit) || [];
        const submitNames = isWeb ? [] : submits.map((field) => field.mani.displayname || 'no name');

        let buttonSelected = -1;
        submits.forEach((field, idx) => field.mani.useit && (buttonSelected = idx));

        const forceSubmit = form?.mani?.options?.submittype === SUBMIT.dosumbit;
        const initialSelected = (forceSubmit || buttonSelected !== -1 ? isWeb ? 0 : buttonSelected : -1) + 1;

        setItems(['Do Not Submit', ...(isWeb ? ['Automatically submit login data'] : submitNames)]);
        setSelected(initialSelected);
    }, [form]);

    return (
        <RadioGroup
            items={items}
            groupName={`submit-form-${form?.type}`}
            selected={selected}
            setSelected={setSelected}
        />
    );
}
