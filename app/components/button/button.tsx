"use client";

import { IconType } from "react-icons";

interface ButtonProps {
    label?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    circle?: boolean;
    icon?: IconType;
}

export default function Button({
    label,
    onClick,
    disabled,
    outline,
    small,
    circle,
    icon: Icon,
}: ButtonProps) {
    return (
        <button onClick={onClick} disabled={disabled} className={`
            relative
            disabled:opacity-70
            disabled:cursor-not-allowed
            transition
            ${circle ? 'w-10 h-10' : 'w-full'}
            ${circle ? 'rounded-full' : 'rounded-lg'}
            ${outline ? 'bg-white' : 'bg-rose-500'}
            ${outline ? 'border-black' : 'border-rose-500'}
            ${outline ? 'text-black' : 'text-white'}
            ${outline ? 'hover:border-neutral-800 hover:bg-zinc-100' : 'hover:opacity-80'}
            ${small ? 'py-1' : 'py-3'}
            ${small ? 'text-sm' : 'text-md'}
            ${small ? 'font-light' : 'font-semibold'}
            ${small ? 'border-[1px]' : 'border-2'}
            ${circle && 'flex flex-col items-center justify-center'}
        `}>
            {Icon && <Icon size={24} className={`${!circle && "absolute left-4 top-3"}`} />}
            {label}
        </button>
    );
}