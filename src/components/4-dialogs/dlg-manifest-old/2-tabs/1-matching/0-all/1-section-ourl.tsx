import { useAtom, useSetAtom } from "jotai";
import { MatchWebStateAtom, areUrlsChanged } from "./9-types";

export function Section_Ourl({ urlsAtom }: { urlsAtom: MatchWebStateAtom; }) {
    const [urls, setUrls] = useAtom(urlsAtom);
    const setIsChanged = useSetAtom(urls.isChangedAtom);

    return (
        <div className="mb-1 flex items-center justify-between gap-2">
            <div className="font-bold text-gray-600">
                Original url
            </div>

            <input
                className="flex-1 px-2 py-1.5 w-full min-w-0 border border-gray-400 rounded shadow-inner"
                spellCheck={false}
                value={urls.o}
                onChange={
                    (event) => {
                        const newState = { ...urls, o: event.target.value };
                        setUrls(newState);
                        setIsChanged(areUrlsChanged(newState));
                    }
                }
            />
        </div>
    );
}
