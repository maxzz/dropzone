import { FileUs, FileUsAtom } from '../../store/store';

type FormData = {
    meta?: Meta.Form;
};

export type CardDatum = {
    fileUs: FileUs;     // raw data
    //fname: string;      // manifest filename
    //title?: string;     // title by user
    // hasLogin?: boolean; // has login form
    // hasCpass?: boolean; // has change password form
    // login: FormData;    // login form
    // cpass: FormData;    // change password form
};

export type FormDatum = {
    fileUsAtom: FileUsAtom;
    formIndex: number;
}

function buildCardDatum(fileUs: FileUs): CardDatum {
    const m: Mani.Manifest = fileUs.mani!;
    //console.log('raw', fileUs.raw);

    let cardData: CardDatum = {
        fileUs,
        //fname: '',
        // login: {
        //     meta: fileUs.meta?.[0],
        // },
        // cpass: {
        //     meta: fileUs.meta?.[1],
        // },
    };

    //cardData.fname = fileUs.fname;
    //cardData.title = m.forms[0]?.options.choosename;
    // cardData.hasLogin = m.forms?.length > 0;
    // cardData.hasCpass = m.forms?.length > 1;

    return cardData;
}

//export default buildCardDatum;
