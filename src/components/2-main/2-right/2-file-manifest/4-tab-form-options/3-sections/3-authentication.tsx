import { FormAtoms } from '../0-create-atoms';
import { RowBoolean } from '../4-controls';

export function Part3Authentication({ atoms }: { atoms: FormAtoms; }) {
    return (<>
        <div className="mb-1" title="Start authentication immediately">Authenticate immediately</div>
        <RowBoolean className="mb-1 justify-self-start" useItAtom={atoms.uiPart3Authentication.aimAtom} />

        <div className="">Lock out login fields</div>
        <RowBoolean className="justify-self-start" useItAtom={atoms.uiPart3Authentication.lockAtom} />
    </>);
}