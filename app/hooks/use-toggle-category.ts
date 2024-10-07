import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from 'query-string';

export const useToggleCategory = () => {
    const router = useRouter();
    const params = useSearchParams();
    const pathname = usePathname();
    const selectedCategory = params?.get('category');
    const toggleCategory = useCallback((label: string) => {
        const currentQuery = qs.parse(params?.toString() || '');
        const updatedQuery = {
            ...currentQuery,
            category: params?.get('category') === label ? null : label
        };
        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });

        router.push(url);
    }, [router, params]);

    return toggleCategory;
}