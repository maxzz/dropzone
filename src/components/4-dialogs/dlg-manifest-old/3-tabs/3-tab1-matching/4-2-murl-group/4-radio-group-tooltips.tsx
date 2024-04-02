import { ChangeEvent } from 'react';
import { UiTip, tipSmall } from '@ui/ui-tooltip';
import { RadioButton } from './3-radio-button';

function RadioTooltip({ value, curValue, label, title }: { value: number; curValue: number; label: string; title?: string; }) {
    return (
        <UiTip trigger={<RadioButton groupName="how" value={value} checked={value === curValue} label={label} />} {...tipSmall()}>
            <div className="text-xs">
                {title || label}
            </div>
        </UiTip>
    );
}

export function RadioGroupTooltips({ value, setValue }: { value: number; setValue: (v: number) => void; }) {
    return (
        <div
            className="px-3 py-2 max-w-max flex flex-col space-y-1 border border-gray-300 rounded"
            onChange={(v: ChangeEvent<HTMLInputElement>) => setValue(+v.target.value)}
        >
            <RadioTooltip value={0} curValue={value} label="Same as original url" />
            <RadioTooltip value={1} curValue={value} label="Match only domain of original url" />
            <RadioTooltip value={2} curValue={value} label="Wildcard match" />
            <RadioTooltip value={3} curValue={value} label="Regular expresssion" />
            <RadioTooltip value={4} curValue={value} label="No domain match" title="Exclude this login from domain match" />
        </div>
    );
}
