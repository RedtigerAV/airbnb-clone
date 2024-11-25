"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from "@/app/hooks/use-register-modal";
import Modal from "./modal";
import Heading from "../heading/heading";
import Input from "../inputs/input";
import toast from "react-hot-toast";
import Button from "../button/button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/use-login-modal";

export default function RegisterModal() {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const openLoginModal = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal]);

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                toast.success('Success!');
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch(() => (toast.error('Something went wrong')))
            .finally(() => (setIsLoading(false)));
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subtitle="Create an account!" />

            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
            <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
            <Input id="password" type="password" label="password" disabled={isLoading} register={register} errors={errors} required />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => signIn('google')} />
            <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => signIn('github')} />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row items-center justify-center gap-2">
                    <div>Already have an account?</div>
                    <div onClick={openLoginModal} className="text-neutral-800 cursor-pointer hover:underline">Log in</div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}