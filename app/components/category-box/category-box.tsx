"use client"

import { IconType } from "react-icons";

export interface CategotyBoxProps {
    label: string;
    icon: IconType;
    selected: boolean;
    onClick?: (label: string) => void;
    view: 'Tab' | 'Box'
}

export default function CategoryBox({ label, icon: Icon, selected, onClick, view }: CategotyBoxProps) {
    return (
        <div onClick={() => onClick?.(label)} className={`
            flex
            flex-col
            items-center
            justify-center
            gap-2
            p-3
            hover:text-neutral-800
            transition
            cursor-pointer
            select-none
            ${selected ? 'text-neutral-800' : 'text-neutral-500'}
            ${view === 'Tab' && 'border-b-2'}
            ${view === 'Box' && 'border-2 rounded-xl hover:border-neutral-800'}
            ${selected && 'border-neutral-800'}
            ${view === 'Tab' && !selected && 'border-transparent'}
            ${view === 'Box' && !selected && 'border-neutral-200'}
        `}>
            <Icon size={24} />
            <div className="font-medium text-sm">{label}</div>
        </div>
    )
}