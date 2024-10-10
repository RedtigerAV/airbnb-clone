"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Button from "../button/button";

interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    maxValue?: number;
    minValue?: number;
    onChange: (value: number) => void;
}

export function Counter({ title, subtitle, value, onChange, minValue = 1, maxValue = Number.MAX_SAFE_INTEGER }: CounterProps) {
    const onAdd = useCallback(() => {
        const newValue = Math.min(value + 1, maxValue);

        onChange(newValue);
    }, [value, maxValue, onChange]);

    const onReduce = useCallback(() => {
        const newValue = Math.max(value - 1, minValue);

        onChange(newValue);
    }, [value, minValue, onChange]);

    return (
        <div className="flex flex-nowrap w-full justify-between items-center">
            <div className="flex flex-col gap-1">
                <div className="font-medium">{title}</div>
                {subtitle && <div className="font-light text-gray-600">{subtitle}</div>}
            </div>
            <div className="flex flex-row gap-4 flex-nowrap items-center">
                <Button circle outline icon={AiOutlineMinus} onClick={onReduce} />
                <div className="font-light text-xl text-neutral-600 min-w-6 text-center">{value}</div>
                <Button circle outline icon={AiOutlinePlus} onClick={onAdd} />
            </div>
        </div>
    )
}