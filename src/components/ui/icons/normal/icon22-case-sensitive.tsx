import { type HTMLAttributes, type SVGAttributes } from "react";
import { classNames } from "@/utils";

export function IconCaseSensitive({ className, title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-current", className)} viewBox="0 0 16 16" {...rest}>
            {title && <title>{title}</title>}
            <path d="M9.187 11.702H7.785l-.693-1.96h-3.03l-.666 1.96H2L4.884 4h1.44l2.863 7.702zM6.753 8.7L5.685 5.627a3.639 3.639 0 0 1-.102-.483H5.56a3.144 3.144 0 0 1-.107.483L4.396 8.7h2.357z" />
            <path d="M14.277 11.702h-1.208v-.86h-.022c-.38.66-.936.99-1.67.99c-.541 0-.965-.148-1.273-.441c-.305-.294-.457-.682-.457-1.166c0-1.038.598-1.643 1.794-1.815l1.633-.231c0-.784-.373-1.177-1.117-1.177c-.656 0-1.246.226-1.773.677V6.59c.58-.344 1.25-.516 2.009-.516c1.39 0 2.084.684 2.084 2.052v3.577zM13.074 9l-1.155.162c-.358.046-.628.134-.81.263c-.18.125-.27.347-.27.666c0 .233.083.424.248.575c.168.146.392.22.671.22c.38 0 .693-.133.94-.398c.25-.268.376-.605.376-1.01V9z" />
        </svg>
    );
}
