import { Fragment } from "react";
import { MPath } from "@/store/manifest";
import { Section } from "./5-section";

export function Part_P4({ part, label }: { part: MPath.p4[]; label: string; }) {

    function beautifyHint(item: MPath.p4a): string {
        return `Role #: ${item.rnumber} | Role: ${item.roleString} | Classname: "${item.className}" | Name: "${item.name}"`;
    }

    function beautifyVal(item: MPath.p4a): string {
        return `${item.className} | ${item.name}`;
    }

    return (<>
        {!!part && (
            <div>
                <Section label={label} />
                
                <div className="mx-px grid grid-cols-[auto,1fr] border-b border-b-primary-400">
                    {part.map(
                        (item, idx) => (
                            <Fragment key={idx}>
                                <div className="px-2 leading-5 border-l border-r border-t border-primary-400">
                                    {idx}
                                </div>

                                <div className="px-2 overflow-x-hidden leading-5 border-r border-t border-primary-400" title={beautifyHint(item)}>
                                    <div className="overflow-x-hidden whitespace-nowrap overflow-ellipsis">
                                        {beautifyVal(item)}
                                    </div>
                                </div>
                            </Fragment>
                        ))
                    }
                </div>
            </div>
        )}
    </>);
}
