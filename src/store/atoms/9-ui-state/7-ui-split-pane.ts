import { atomWithCallback } from "@/hooks/atomsX";
import { LocalStorageSave, } from "@/store/store-localstorage-save";
import { LocalStorage } from "@/store/store-localstorage-load";

// UI split pane position

export const splitPaneAtom = atomWithCallback<number>(LocalStorage.initialData.vSplitPos, LocalStorageSave.save);
