import { Fragment } from "react";
import { Section } from "./5-section";

export function PartLoc({ part, label }: { part: string; label: string; }) {
    const items = part.split('|');

    function beautifyRect(item: string) {
        return item.split(' ');
    }

    return (<>
        {!!part && (
            <div>
                <Section label={<div className="flex space-x-2">
                    <div>{label}</div>
                    <div className="font-normal">(x, y; w x h)</div>
                </div>} />

                <div className="mx-2 grid grid-cols-[repeat(5,min-content)] gap-x-2">
                    {items.map(
                        (item, idx) => {
                            return <Fragment key={idx}>
                                <div>
                                    {idx}:
                                </div>
                                
                                {beautifyRect(item).map((pt, idx) => (
                                    <div className="text-right" key={idx}>
                                        {pt}
                                    </div>
                                ))}
                            </Fragment>;
                        })
                    }
                </div>
            </div>
        )}
    </>);
}
