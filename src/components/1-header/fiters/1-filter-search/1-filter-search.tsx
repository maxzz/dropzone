import { UiTip } from '@ui/ui-tooltip';
import { Config } from 'react-popper-tooltip';
import { InputAndTrigger } from './2-input-and-trigger';
import { PopupContent } from './3-popup-content';

const popperOptions: Config = {
    delayShow: 700,
    offset: [0, 8],
    //defaultVisible: true,
};

const FilterSearchClasses = "\
flex-1 \
sm:self-stretch \
md:pb-2 lg:pb-0 \
md:self-end \
lg:self-auto \
ml-2 md:ml-4 \
min-h-[32px] max-w-[40rem] \
flex justify-end items-center";

export function FilterSearch() {
    return (
        <div className={FilterSearchClasses}>
            <UiTip trigger={<InputAndTrigger />} popperOptions={popperOptions} arrow>
                <PopupContent />
            </UiTip>
        </div>
    );
}

//TODO: add history to UI and store history to the localStorage
//TODO: win: and web: prefixes - done
