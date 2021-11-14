import toast from 'react-hot-toast';

type Not = typeof toast.custom;

export const ToastWarning: Not = (message, options) => {
    return toast(message,
        {...options, ...{ style: { backgroundColor: 'tomato' } }}
    );
};
