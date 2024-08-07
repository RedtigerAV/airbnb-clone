"use client";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from "@/app/hooks/use-register-modal";
import Modal from "./modal";
import Heading from "../heading/heading";
import Input from "../inputs/input";
import toast from "react-hot-toast";
import Button from "../button/button";
import useLoginModal from "@/app/hooks/use-login-modal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginModal() {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', { ...data, redirect: false })
            .then((callback) => {
                if (callback?.ok) {
                    toast.success('Logged in');
                    router.refresh();
                    loginModal.onClose();
                }

                if (callback?.error) {
                    toast.error(callback?.error);
                }
            })
            .finally(() => (setIsLoading(false)));
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome back" subtitle="Login to your account!" />

            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
            <Input id="password" type="password" label="password" disabled={isLoading} register={register} errors={errors} required />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => { }} />
            <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => { }} />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row items-center justify-center gap-2">
                    <div>Already have an account?</div>
                    <div onClick={registerModal.onClose} className="text-neutral-800 cursor-pointer hover:underline">Log in</div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}