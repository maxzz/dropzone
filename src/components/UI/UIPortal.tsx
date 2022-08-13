import { ReactNode } from "react";
import ReactDOM from "react-dom";

export function UIPortal({ children }: { children: ReactNode; }) {
    return ReactDOM.createPortal(children, document.getElementById('portal')!);
}
