import { tv } from 'tailwind-variants';

const btnStyles = tv({
    base: 'capitalize flex gap-2 items-center justify-center font-medium transition-all duration-200 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-none',
    variants: {
        btnType: {
            white: 'w-max px-6 py-3 bg-white text-indigo-500 rounded-sm hover:bg-slate-100',
            primary: 'w-max px-6 py-3 bg-indigo-500 text-white rounded-sm hover:bg-indigo-700',
            primaryFW: 'w-full px-6 py-3 bg-indigo-500 text-white rounded-sm hover:bg-indigo-700',
            secondary: 'w-max px-6 py-3 bg-slate-50 text-slate-600 rounded-sm border-[1.5px] border-slate-300 hover:bg-slate-200',
            secondaryFW: 'w-full px-6 py-3 bg-slate-50 text-slate-600 rounded-sm border-[1.5px] border-slate-300 hover:bg-slate-200',
            danger: 'w-max px-6 py-3 bg-red-500 text-red-50 rounded-sm hover:bg-red-700',
            dangerFW: 'w-full px-6 py-3 bg-red-500 text-red-50 rounded-sm hover:bg-indigo-700',
            warning: 'w-max px-6 py-3 bg-yellow-500 text-yellow-50 rounded-sm hover:bg-amber-600',
            warningFW: 'w-full px-6 py-3 bg-yellow-500 text-yellow-50 rounded-sm hover:bg-amber-600',
            success: 'w-max px-6 py-3 bg-green-500 text-green-50 rounded-sm hover:bg-green-700',
            successFW: 'w-full px-6 py-3 bg-green-500 text-green-50 rounded-sm hover:bg-green-700',
            info: 'w-max px-6 py-3 bg-sky-500 text-sky-50 rounded-sm hover:bg-sky-700',
            infoFW: 'w-full px-6 py-3 bg-sky-500 text-sky-50 rounded-sm hover:bg-sky-700',
            bgNone: 'w-max px-6 py-3 bg-transparent text-slate-600 rounded-sm hover:text-indigo-500',
            bgNoneFW: 'w-full px-6 py-3 bg-transparent text-slate-600 rounded-sm hover:text-indigo-500',
            iconOnly: 'p-2.5 bg-slate-50 text-slate-600 rounded-full border-[1.5px] border-slate-300 hover:bg-slate-200',
            iconOnlySq: '-m-2.5 p-2.5 bg-slate-50 text-slate-600 rounded-sm border-[1.5px] border-slate-300 hover:bg-slate-200',
            iconOnlyNoBr: 'p-2.5 text-slate-800 rounded-full hover:bg-slate-200',
            iconOnlySqNoBr: 'p-2.5 text-slate-800 rounded-sm hover:bg-slate-200'
        }
    }
});

const Buttons = ({ children, type, variant = 'primary', className, handleClick, disabled, ...props }) => {
    const dis = disabled || false;
    return <button type={type} onClick={handleClick} className={`${btnStyles({ btnType: variant })} ${className}`} disabled={dis} {...props}>{children}</button>;
};

export default Buttons;