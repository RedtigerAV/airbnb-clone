import axios from 'axios';
import { toast } from 'react-hot-toast';
import { SafeUser } from "../types";
import useLoginModal from "./use-login-modal";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null;
}

export const useFavorite = ({
    listingId,
    currentUser
}: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId)
    }, [listingId, currentUser]);

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            const request = () => axios[hasFavorited ? 'delete' : 'post'](`/api/favorites/${listingId}`);

            await request();
            router.refresh();
            toast.success('Success');
        } catch (e) {
            toast.error('Something went wrong');
        }
    }, [currentUser, listingId, hasFavorited, loginModal, router]);

    return {
        hasFavorited,
        toggleFavorite
    };
}