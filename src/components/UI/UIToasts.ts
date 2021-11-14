import toast from 'react-hot-toast';

export const toastWarning: typeof toast.custom = (message, options) => {
    return toast(message,
        {...{ style: { backgroundColor: 'tomato' } }, ...options}
    );
};
