"use client";

import { IconType } from "react-icons";

interface ListingCategoryProps {
    icon: IconType;
    label: string;
    description: string;
}

export function ListingCategory({ icon: Icon, label, description }: ListingCategoryProps) {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row items-center gap-4">
                <Icon size={40} className="text-neutral-800" />
                <div className="flex flex-col justify-around">
                    <div className="text-lg font-semibold">{label}</div>
                    <div className="text-neutral-500 font-light">{description}</div>
                </div>
            </div>
        </div>
    )
}