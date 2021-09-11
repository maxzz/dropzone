import { atom, WritableAtom } from 'jotai';
import uuid from '../utils/uuid';
//import { loadByText } from './manifest/mani-io';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type FileUs = {
    id: string;
    name: string;
    modified: number; // last modified
    size: number;
    raw?: string;
    mani?: Manifest;
    file?: File;
};

export type FileUsAtom = WritableAtom<FileUs, FileUs>;

// Files

export const filesAtom = atom<FileUsAtom[]>([]);

export const SetFilesAtom = atom(
    null,
    (get, set, accepterFiles: File[]) => {
        const dropped: FileUsAtom[] = accepterFiles.map((file) => {
            return atom<FileUs>({
                id: uuid(),
                name: file.name,
                modified: file.lastModified,
                size: file.size,
                file: file,
            });
        });
        set(filesAtom, dropped);
        set(updateCacheAtom);
    }
);

// Cache

function textFileReader(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const aborted = () => reject(`file (${file.name}) reading was aborted`);
        reader.onabort = aborted;
        reader.onerror = aborted;
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.readAsText(file);
    });
}

const updateCacheAtom = atom(
    null,
    async (get, set) => {
        const files = get(filesAtom);

        for (let fileAtom of files) {
            try {
                const file = get(fileAtom);

                if (file.file && !file.raw) {
                    const cnt = await textFileReader(file.file);
                    //console.log('cnt', cnt);

                    //const mani: Manifest = loadByText(cnt);
                    const mani: Manifest | undefined = getManifest(cnt);

                    const newAtom = {
                        ...file,
                        raw: cnt,
                        mani: mani,
                    };
                    set(fileAtom, newAtom);
                    //await delay(1000);
                }
            } catch (error) {
                console.log('error', error);
            }
        }
    }
);

import textData from '../assets/{ff06f637-4270-4a0e-95a3-6f4995dceae6}.dpm';
import { parse } from 'fast-xml-parser';
import { beautifyXMLManifest } from './manifest/mani-io';

// function test() {
//     var options = {
//         attributeNamePrefix: "",
//         attrNodeName: "_attributes",
//         ignoreAttributes: false,
//         allowBooleanAttributes: true,
//     };

//     const res = parse(textData, options);
//     console.log('test', res);
// }
// test();

function getManifest(cnt: string): Manifest | undefined {
    var options = {
        attributeNamePrefix: "",
        attrNodeName: "_attributes",
        ignoreAttributes: false,
        allowBooleanAttributes: true,
    };

    try {
        const obj = parse(cnt, options);
        console.log('%craw', 'color: red', obj);
        //const res = obj.manifest;
        const res = beautifyXMLManifest(obj.manifest);
        console.log('%ctm', 'color: red', res);
        return res;
    } catch (error) {
        console.log('%ctm error', 'color: red', error);
    }
}

