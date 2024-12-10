"use client"

import { useEffect } from "react";
import { EmptyState } from "./components/empty-state/empty-state";

interface ErrorStateProps {
    error: Error;
}

export default function Error({ error }: ErrorStateProps) {

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <EmptyState title="Uh Oh :(" subtitle="Something went wrong. Please try again later" />
    )
}