"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../avatar/avatar";
import { useState } from "react";
import MenuItem from "./menu-item";
import useRegisterModal from "@/app/hooks/use-register-modal";
import useLoginModal from "@/app/hooks/use-login-modal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface UserMenuProps {
    currentUser?: User | null;
}

export default function UserMenu({ currentUser }: UserMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const toggleOpen = () => setIsOpen((prev) => !prev);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={() => { }} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    Airbnb you home
                </div>
                <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu />

                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem onClick={() => { }} label="My trips" />
                                <MenuItem onClick={() => { }} label="My favorites" />
                                <MenuItem onClick={() => { }} label="My reservations" />
                                <MenuItem onClick={() => { }} label="My properties" />
                                <MenuItem onClick={() => { }} label="Airbnb my home" />
                                <hr />
                                <MenuItem onClick={() => signOut()} label="Logout" />
                            </>
                        ) : (
                            <>
                                <MenuItem onClick={loginModal.onOpen} label="Login" />
                                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}