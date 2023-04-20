import React from 'react';
import { FileUs } from '@/store';
import { convertToXml } from '@/store/manifest';
import toast from 'react-hot-toast';

export function DialogContent({ setShow }: { setShow?: (v: boolean) => void; }) {
    return (
        <div className="text-primary-300">
            <div className="">-=------------------------</div>
            <div className="">-=------------------------</div>
            <div className="">-=------------------------</div>
            <div className="">-=------------------------</div>
            <div className="">-=------------------------</div>
        </div>
    );
}

export function saveXmlFile(fileUs: FileUs) {
    const res = convertToXml(fileUs);
    if (res.error) {
        toast(res.error, { style: { backgroundColor: 'tomato' } });
    } else {
        res.xml && console.log('%c---------new xml from converted---------', 'color: green', `\n${res.xml}`);
        toast('Done', { style: { backgroundColor: 'tomato' } });
    }
}

