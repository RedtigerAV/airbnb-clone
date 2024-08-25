"use client";

import Image from "next/image";

interface AvatarProps {
    src?: string | null;
}

export default function Avatar({ src }: AvatarProps) {
    return (
        <Image src={src || "/images/placeholder.jpg"} alt="Avatar" width={30} height={30} className="rounded-full" />
    )
}