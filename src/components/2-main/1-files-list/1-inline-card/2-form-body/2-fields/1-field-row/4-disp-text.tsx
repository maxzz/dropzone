import { Mani } from '@/store/manifest';
import { classNames } from '@/utils';

export function part4_DispText(useIt: boolean | undefined, type: Mani.FieldTypeStr | 'NOTYPE', displayname: string) {
    return (
        <div className="flex-1 cursor-default whitespace-nowrap">
            {type === 'text'
                ? (
                    <div className="flex">
                        <div
                            className={classNames(
                                "px-1 h-4 text-[10px] leading-[12px] border-primary-600 border border-dotted rounded-sm cursor-default",
                                useIt ? "bg-primary-300 text-primary-800" : "opacity-50"
                            )}
                            title={`Matching pattern:\n${displayname}`}
                        >
                            patern
                        </div>
                    </div>
                )
                : (
                    <div title={`Dispaly name: ${displayname}`}>
                        {`${displayname.substring(0, 15)}${displayname.length > 15 ? '...' : ''}`}
                    </div>
                )
            }

            {/* TODO: */}
            {/* <div className="w-[20%] pr-2 cursor-default overflow-hidden">
                <div className="whitespace-nowrap overflow-ellipsis">{disp}</div>
            </div> */}

        </div>
    );
}

//TODO: why row w/ pattern selected w/ prev edit field?
//TODO: move color primary and top parent, i.e. single place

//TODO: className={classNames("row-field-framed", low && "opacity-25")}
// function borderDiv(low: boolean) {
//     return (
//         <div className=""></div>
//     );
// }
