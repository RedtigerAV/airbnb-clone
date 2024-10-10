"use client";

import useRentModal from "@/app/hooks/use-rent-modal";
import Modal from "./modal";
import { useCallback, useMemo, useState } from "react";
import Heading from "../heading/heading";
import categories from "@/app/consts/categories";
import CategoryBox from "../category-box/category-box";
import { FieldValues, useForm } from "react-hook-form";
import { CountrySelect } from "../inputs/country-select";
import dynamic from "next/dynamic";
import { Counter } from "../inputs/counter";
import { ImageUpload } from "../inputs/image-upload";

enum STEPS {
    CATEGORY,
    LOCATION,
    INFO,
    IMAGES,
    DESCRIPTION,
    PRICE
}

export default function RentModal() {
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const onBack = useCallback(() => (setStep((value) => Math.max(0, value - 1))), [setStep]);
    const onNext = useCallback(() => (setStep((value) => Math.min(STEPS.PRICE, value + 1))), [setStep]);
    const actionLabel = useMemo(() => step === STEPS.PRICE ? 'Create' : 'Next', [step]);
    const secondaryActionLabel = useMemo(() => step === STEPS.CATEGORY ? undefined : 'Back', [step]);
    const {
        register,
        handleSubmit,
        setValue: _setValue,
        watch,
        formState: { errors },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    });
    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');
    const setValue = (id: string, value: any) => {
        _setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    };

    const Map = useMemo(
        () => dynamic(
            () => import('../map/map').then(m => m.Map),
            {
                ssr: false,
                loading: () => (
                    <div className="h-[35vh] w-full rounded-lg flex flex-col justify-center items-center">
                        <span>Loading...</span>
                    </div>
                )
            }
        ), [location]);

    let bodyContent = (
        <div className="flex flex-col flex-nowrap gap-6">
            <Heading
                title="Which of these best describes your place?"
                subtitle="Pick a category" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:max-h-[50vh] md:overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryBox label={item.label} icon={item.icon} view="Box" selected={category === item.label} onClick={(_category) => setValue('category', _category)} />
                    </div>
                ))}
            </div>
        </div>
    );

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-6">
                <Heading title="Where is your place located?" subtitle="Help guests find you!" />

                <CountrySelect value={location} onChange={(value) => setValue('location', value)} />

                <Map center={location?.latlng} />
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-6">
                <Heading title="Share some basics about your place" subtitle="What amenities do you have?" />

                <Counter title="Guests" subtitle="How many guests do you allow?" value={guestCount} onChange={(value) => setValue('guestCount', value)} />
                <hr />
                <Counter title="Rooms" subtitle="How many rooms do you have?" value={roomCount} onChange={(value) => setValue('roomCount', value)} />
                <hr />
                <Counter title="Bathrooms" subtitle="How many bathrooms do you have?" value={bathroomCount} onChange={(value) => setValue('bathroomCount', value)} />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-6">
                <Heading title="Add a photo of your place" subtitle="Show guests what your place looks like" />

                <ImageUpload value={imageSrc} onChange={value => setValue('imageSrc', value)} />
            </div>
        )
    }

    return (
        <Modal
            title="Airbnb my home"
            body={bodyContent}
            isOpen={rentModal.isOpen}
            onSubmit={step === STEPS.PRICE ? rentModal.onClose : onNext}
            onClose={rentModal.onClose}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        />
    )
}