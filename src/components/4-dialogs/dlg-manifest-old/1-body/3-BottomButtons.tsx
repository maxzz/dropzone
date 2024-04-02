export function BottomButtons({ setShow }: { setShow: (v: boolean) => void; }) {
    return (
        <div className="flex space-x-2">
            <button
                className="px-4 py-2 min-w-[6rem] h-9 leading-4 text-gray-900 bg-gray-200 border border-gray-500 rounded shadow active:scale-[.97]"
                onClick={() => {
                    setShow(false);
                    // toastWarning(<div><div className="font-bold">Not implemented</div><div className="">yet</div></div>, { style: { backgroundColor: 'tomato' } });
                }}
            >OK</button>

            <button
                className="px-4 py-2 min-w-[6rem] h-9 leading-4 text-gray-900 bg-gray-200 border border-gray-500 rounded shadow active:scale-[.97]"
                onClick={() => {
                    setShow(false);
                }}
            >Cancel</button>
        </div>
    );
}
