"use client"

import { IconType } from "react-icons";

export interface CategotyBoxProps {
    label: string;
    icon: IconType;
    selected: boolean;
    onClick?: (label: string) => void;
}

export default function CategoryBox({ label, icon: Icon, selected, onClick }: CategotyBoxProps) {
    return (
        <div onClick={() => onClick?.(label)} className={`
            flex
            flex-col
            items-center
            justify-center
            gap-2
            p-3
            border-b-2
            hover:text-neutral-800
            transition
            cursor-pointer
            select-none
            ${selected ? 'border-b-neutral-800' : 'border-transparent'}
            ${selected ? 'text-neutral-800' : 'text-neutral-500'}
        `}>
            <Icon size={24} />
            <div className="font-medium text-sm">{label}</div>
        </div>
    )
}