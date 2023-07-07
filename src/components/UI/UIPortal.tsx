import { ReactNode } from "react";
import ReactDOM from "react-dom";

export function UiPortal({ children }: { children: ReactNode; }) {
    return ReactDOM.createPortal(children, document.getElementById('portal')!);
}
