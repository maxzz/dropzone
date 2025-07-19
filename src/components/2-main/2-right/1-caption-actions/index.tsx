import { FileUsAtomType } from "@/store";
import { ButtonCardEdit, ButtonCardOpenUrl } from "./caption-buttons";
import { CardTitleMenu } from "./menu";

export function Body_CaptionActions({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    return (
        <div className="flex items-center">
            <ButtonCardEdit fileUsAtom={fileUsAtom} formIdx={0} />
            <ButtonCardOpenUrl fileUsAtom={fileUsAtom} />
            <CardTitleMenu fileUsAtom={fileUsAtom} />
        </div>
    );
}
