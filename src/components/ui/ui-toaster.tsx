import toast, { Toaster as ToasterComponent } from "react-hot-toast";

export function UiToaster() {
    return (
        <div className="toaser">
            <ToasterComponent
                position="bottom-right"
                reverseOrder={false}
                gutter={8}
                //containerClassName=""
                //containerStyle={{}}
                toastOptions={{
                    // Define default options
                    //className: '',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    // Default options for specific types
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}
            />
        </div>
    );
}

export const toastWarning: typeof toast.custom = (message, options) => {
    return toast(message,
        { ...{ style: { backgroundColor: 'tomato' } }, ...options }
    );
};
