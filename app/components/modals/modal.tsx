"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../button/button";

interface ModalProps {
    isOpen?: boolean
    onClose?: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
    closeOnBackdropClick?: boolean;
}

export default function Modal({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel,
    closeOnBackdropClick
}: ModalProps) {
    const [showModal, setShowModal] = useState(isOpen);
    const handleClose = useCallback(() => {
        if (disabled) return;

        setShowModal(false);
        setTimeout(() => {
            onClose?.();
        }, 300);
    }, [disabled, onClose]);
    const handleSubmit = useCallback(() => {
        if (disabled) return;

        onSubmit();
    }, [disabled, onSubmit]);
    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) return;

        secondaryAction();
    }, [disabled, secondaryAction]);
    const handleBackdropClick = useCallback(() => {
        if (closeOnBackdropClick) {
            handleClose();
        }
    }, [handleClose, closeOnBackdropClick])

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    // If isOpen === false, just don't show the modal
    if (!isOpen) return null;

    return (
        <>
            <div onClick={handleBackdropClick} className={`
                    justify-center
                    items-center
                    flex
                    fixed
                    inset-0
                    z-50
                    outline-none
                    focus:outline-none
                    transition-colors
                    duration-300
                    ${showModal ? "bg-neutral-800/70" : "bg-neutral-800/0"}
                `}>
                <div onClick={(event) => event.stopPropagation()} className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto max-h-screen">
                    {/* CONTENT */}
                    <div className={`
                        translate
                        duration-300
                        h-full
                        ${showModal ? "translate-y-0" : "translate-y-full"}
                        ${showModal ? "opacity-100" : "opacity-0"}
                    `}>
                        <div className="translate h-full md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/* HEADER */}

                            <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                                <button onClick={handleClose} className="p-1 border-0 hover:opacity-70 transition absolute left-9">
                                    <IoMdClose size={18} />
                                </button>

                                <div className="text-lg font-semibold">
                                    {title}
                                </div>
                            </div>

                            {/* BODY */}
                            <div className="relative p-6 flex-1 max-md:overflow-y-auto">
                                {body}
                            </div>

                            {/* FOOTER */}

                            <div className="flex flex-col gap-2 p-6">
                                <div className="flex flex-row items-center gap-4 w-full">
                                    {secondaryAction && secondaryActionLabel && (
                                        <Button outline disabled={disabled} label={secondaryActionLabel} onClick={handleSecondaryAction} />
                                    )}
                                    <Button disabled={disabled} label={actionLabel} onClick={handleSubmit} />
                                </div>

                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}