import { ChangeEvent } from 'react';
import { UiTip, tipSmall } from '@ui/ui-tooltip';
import { RadioButton } from './1-radio-button';

export function RadioGroup({ value, setValue }: { value: number; setValue: (v: number) => void; }) {
    return (
        <div
            className="px-3 py-2 max-w-max flex flex-col space-y-1 border border-gray-300 rounded"
            onChange={(v: ChangeEvent<HTMLInputElement>) => setValue(+v.target.value)}
        >
            <UiTip trigger={<RadioButton groupName={"how"} value={0} checked={value === 0} label="Same as original url" />} {...tipSmall()}>
                <div className="text-xs">Same as original url</div>
            </UiTip>

            <UiTip trigger={<RadioButton groupName={"how"} value={1} checked={value === 1} label="Match only domain of original url" />} {...tipSmall()}>
                <div className="text-xs">Match only domain of original url</div>
            </UiTip>

            <UiTip trigger={<RadioButton groupName={"how"} value={2} checked={value === 2} label="Wildcard match" />} {...tipSmall()}>
                <div className="text-xs">Wildcard match</div>
            </UiTip>

            <UiTip trigger={<RadioButton groupName={"how"} value={3} checked={value === 3} label="Regular expresssion" />} {...tipSmall()}>
                <div className="text-xs">Regular expresssion</div>
            </UiTip>

            <UiTip trigger={<RadioButton groupName={"how"} value={4} checked={value === 4} label="No domain match" />} {...tipSmall()}>
                <div className="text-xs">Exclude this login from domain match</div>
            </UiTip>
        </div>
    );
}
