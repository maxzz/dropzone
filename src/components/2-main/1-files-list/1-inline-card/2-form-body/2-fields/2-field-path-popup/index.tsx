import { Meta } from "@/store/manifest";
import { PartSid } from "./1-part-sid";
import { PartStr } from "./2-part-str";
import { Part_P4 } from "./3-part-p4";
import { PartLoc } from "./4-part-loc";

export function FieldRowPath({ field }: { field: Meta.Field; }) {
    const { sid, did2: dd2, p4: p4_, p4a, loc, sn: sn_, } = field.path;
    
    return (
        <div className="w-[28rem] bg-primary-100 rounded p-0.5 border border-primary-700">
            <div className="pl-4 pb-1 text-xs bg-primary-100">
                <div className={"pr-2 max-w-[min(28rem,50vw)] max-h-[max(32rem,40vh)] space-y-4 overflow-auto smallscroll"}>

                    {sid && <PartSid part={sid} label={'sid'} />}
                    {dd2 && <PartStr part={dd2} label={'did2'} />}
                    {p4_ && <Part_P4 part={p4_} label={'p4'} />}
                    {p4a && <Part_P4 part={p4a} label={'p4a'} />}
                    {loc && <PartLoc part={loc} label={'loc'} />}
                    {sn_ && <PartStr part={sn_} label={'sn'} />}

                </div>
            </div>
        </div>
    );
}
