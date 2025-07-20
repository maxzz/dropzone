// import { toastWarning } from "@ui/ui-toaster";

export function BottomButtons({ setShow }: { setShow?: (v: boolean) => void; }) {
    return (
        <div className="flex space-x-2">
            <button
                className={buttonClasses}
                onClick={
                    () => {
                        setShow?.(false);
                        // toastWarning(
                        //     <div><div className="font-bold">Not implemented</div><div className="">yet</div></div>, { style: { backgroundColor: 'tomato' } }
                        // );
                    }
                }
            >
                OK
            </button>

            <button
                className={buttonClasses}
                onClick={() => { setShow?.(false); }}
            >
                Cancel
            </button>
        </div>
    );
}

const buttonClasses = "\
px-4 py-2 min-w-[6rem] h-9 leading-4 \
\
text-gray-900 bg-gray-200 border-gray-500 \
\
border rounded shadow \
active:scale-[.97]";
