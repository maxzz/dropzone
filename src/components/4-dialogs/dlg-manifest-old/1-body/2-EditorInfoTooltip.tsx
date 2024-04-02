import { useAtomValue } from 'jotai';
import { EditorData, formIdxName } from '@/store';
import { UiTip } from '@ui/ui-tooltip';
import { ManiFilenameParts } from '@/components/2-main/1-files-list/1-inline-card/1-title/4-filename';
import { IconInfo } from '@ui/icons';

export function EditorInfoTooltip({ editorData }: { editorData: EditorData; }) {
    const fileUs = useAtomValue(editorData.fileUsAtom);
    const stats = fileUs.stats;
    const formName = `${formIdxName(editorData.formIdx)}`;
    const fname = ManiFilenameParts({ fname: fileUs.fname, classLg: "px-1 text-[.65rem] font-bold text-gray-600 opacity-100" });
    return (
        <UiTip
            trigger={<IconInfo
                className="w-7 h-7 text-gray-300"
                style={{ filter: 'drop-shadow(#907bdab0 0px 0px .2rem)' }}
                fill="#fff"
                stroke="#0004"
                strokeWidth={1} />}
            arrow={true}
        >
            {/* Popup content */}
            <div className="text-xs grid grid-cols-[auto,1fr] gap-x-2">
                <div className="font-bold">Form</div>
                <div>{formName}</div>

                {stats.domain && <>
                    <div className="font-bold">Domain</div>
                    <div>{stats.domain}</div>
                </>}

                <div className="font-bold">Filename</div>
                <div>{fname}</div>

                {stats.dateCreated && <>
                    <div className="font-bold">Created</div>
                    <div>{stats.dateCreated}</div>
                </>}

                {stats.dateModified && <>
                    <div className="font-bold">Modified</div>
                    <div>{stats.dateModified}</div>
                </>}
            </div>
        </UiTip>
    );
}
