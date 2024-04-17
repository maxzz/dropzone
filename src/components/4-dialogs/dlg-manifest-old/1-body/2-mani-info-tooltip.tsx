import { useAtomValue } from 'jotai';
import { ManiEditorData, formIdxName } from '@/store';
import { UiTip } from '@ui/ui-tooltip';
import { ManiFilenameParts } from "@/components/2-main/1-files-list/1-inline-card/1-title/4-filename/1-mani-filename-parts";
import { IconInfo } from '@ui/icons';

const shadowStyles = { filter: 'drop-shadow(#907bdab0 0px 0px .2rem)' };

export function ManiInfoTooltip({ editorData }: { editorData: ManiEditorData; }) {

    const fileUs = useAtomValue(editorData.fileUsAtom);
    const stats = fileUs.stats;
    const formName = `${formIdxName(editorData.formIdx)}`;

    const Icon = <IconInfo className="size-7 text-gray-300 fill-white stroke-[#0004] stroke-1" style={shadowStyles} />;

    return (
        <UiTip trigger={Icon} arrow={true}>
            {/* Popup content */}
            <div className="text-xs grid grid-cols-[auto,1fr] gap-x-2">

                <div className="font-bold">Form</div>
                <div>
                    {formName}
                </div>

                {stats.domain && (<>
                    <div className="font-bold">Domain</div>
                    <div>
                        {stats.domain}
                    </div>
                </>)}

                <div className="font-bold">Filename</div>
                <div>
                    <ManiFilenameParts fname={fileUs.fname} large />
                </div>

                {stats.dateCreated && (<>
                    <div className="font-bold">Created</div>
                    <div>
                        {stats.dateCreated}
                    </div>
                </>)}

                {stats.dateModified && (<>
                    <div className="font-bold">Modified</div>
                    <div>
                        {stats.dateModified}
                    </div>
                </>)}
            </div>
        </UiTip>
    );
}
