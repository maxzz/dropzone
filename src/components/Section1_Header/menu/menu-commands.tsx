import React from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { allCards, rightPanelData, selected4ActionAtom } from '@/store';
import { MenuItem } from '@ui/UDropdownMenu';
import toast from 'react-hot-toast';

export function Command_MarkSelected() {
    const [selectedAtoms, setSelectedAtoms] = useAtom(selected4ActionAtom);
    const rightPanelAtom = useAtomValue(rightPanelData.panelAtom);
    const disabled = !rightPanelAtom;
    return (
        <MenuItem disabled={disabled} onClick={click} title="Mark manifest. Select manifest first.">
            Select / Deselect mainfest
        </MenuItem>
    );

    function click() {
        if (rightPanelAtom) {
            const idx = selectedAtoms.find((atom) => rightPanelAtom === atom);
            setSelectedAtoms(idx ? selectedAtoms.filter((atom) => rightPanelAtom !== atom) : [...selectedAtoms, rightPanelAtom]);
        }
    }
}

export function Command_Convert() {
    //const rightPanel = useAtomValue(rightPanelAtom);
    //const disabled = !rightPanel;
    const disabled = true;
    return (
        <MenuItem
            disabled={disabled}
            onClick={(event) => {
                event.preventDefault();
                toast('Not implemented yet.', { style: { backgroundColor: '#f19700' } });
            }}
            title="Convert manual mode manifest to regular Chrome manifest. Select manifest first."
        >
            Convert manual to normal
        </MenuItem>
    );
}

export function Command_ToggleFolding() {
    const doToggleFolding = useSetAtom(allCards.doFoldAllCardsAtom);
    //const setBusy = useSetAtom(busyAtom);
    return (
        <MenuItem
            onSelect={async () => {
                doToggleFolding(); // setBusy('Folding...'); setTimeout(() => { doToggleFolding(); setBusy(''); }, 0); // still reflow problem
            }}
        >
            Toggle all cards folding
        </MenuItem>
    );
}

const Command_Links_Items = [
    {
        txt: "PMIT version 1.0",
        url: "https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/pmit1",
    },
    {
        txt: "QA website",
        url: "https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/pageqa/index.html",
    },
    {
        txt: "All projects catalog",
        url: "https://maxzz.github.io",
    },
];

export function Command_Links() {
    return (<>
        {Command_Links_Items.map(({ txt, url }, idx) => (
            <MenuItem onSelect={async () => window.open(url, '_blank')} key={idx}>
                {txt}
            </MenuItem>
        ))}
    </>);
}
