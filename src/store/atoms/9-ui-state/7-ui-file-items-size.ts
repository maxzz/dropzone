import { atomWithCallback } from "@/utils";
import { type UISize } from "@/store/store-types";
import { LocalStorageSave, } from "@/store/store-localstorage-save";
import { LocalStorage } from "@/store/store-localstorage-load";

// UI files list items size

export const uiSizeAtom = atomWithCallback<UISize>(LocalStorage.initialData.uiSize, LocalStorageSave.save);
