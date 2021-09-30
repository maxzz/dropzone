import { FileUs } from '../../store/store';

type FormData = {
    meta?: Meta.Form;
};

export type CardData = {
    fileUs: FileUs;     // raw data
    fname: string;      // manifest filename
    title?: string;     // title by user
    hasCpass?: boolean; // has change password
    login: FormData;    // login form
    cpass: FormData;    // change password form
};

function buildCardData(fileUs: FileUs): CardData {
    const m: Mani.Manifest = fileUs.mani!;
    //console.log('raw', fileUs.raw);

    let cardData: CardData = {
        fileUs,
        fname: '',
        login: {
            meta: fileUs.meta?.[0],
        },
        cpass: {
            meta: fileUs.meta?.[1],
        },
    };

    cardData.fname = fileUs.fname;
    cardData.title = m.forms[0]?.options.choosename;
    cardData.hasCpass = m.forms?.length > 1;

    return cardData;
}

export default buildCardData;