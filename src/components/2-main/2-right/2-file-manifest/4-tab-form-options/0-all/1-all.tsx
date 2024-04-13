import { FileUsAtomType, FormIdx } from '@/store';
import { useAtomValue } from 'jotai';
import { createAtoms } from './0-create-atoms';
import { Section } from '../4-controls';
import { Part1General, Part2ScreenDetection, Part3Authentication, Part4QL, Part5PasswordManagerIcon } from '../3-sections';

export function ManiSection4_FormOptions({ fileUsAtom, formIdx }: { fileUsAtom: FileUsAtomType; formIdx: FormIdx; }) {
    // const fileUs = useAtomValue(fileUsAtom);
    // const metaForm = fileUs.meta?.[formIdx];

    const atoms = createAtoms('', () => {
        console.log('changed');
    }, fileUsAtom, formIdx);

    const fileUs = useAtomValue(atoms.fileUsAtom);
    const isWeb = fileUs.stats.isWeb; // TODO: why this is not per form?

    return (
        <div className="mr-1 grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-0.5 items-center font-light text-primary-400">
            <Section label="General" />
            <Part1General atoms={atoms} />

            <Section label="Screen detection" />
            <Part2ScreenDetection atoms={atoms} />

            <Section label="Authentication" />
            <Part3Authentication atoms={atoms} />

            <Section label="Quick link" />
            <Part4QL atoms={atoms} />

            {!isWeb && <>
                <Section label="Password Manager Icon" />
                <Part5PasswordManagerIcon atoms={atoms} />
            </>}
        </div>
    );
}

//TODO: Do we need to show fields: window caption and classname if they don't have sense for web, but created w/ IE?
