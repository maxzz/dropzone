import { FormIdx } from '@/store';

export function NoForm(formType: FormIdx) {
    const label = formType === FormIdx.login ? "No login form" : "No password change form";
    return (
        <div className="px-4 text-lg text-[#32ffdaa0] select-none">
            {label}
        </div>
    );
}
