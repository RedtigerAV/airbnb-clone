'use client';

import Container from "../container/container";
import CategoryBox from "../category-box/category-box";
import { usePathname, useSearchParams } from "next/navigation";
import { useToggleCategory } from "@/app/hooks/use-toggle-category";
import categories from "@/app/consts/categories";

export default function Categories() {
    const toggleCategory = useToggleCategory();
    const params = useSearchParams();
    const pathname = usePathname();
    const selectedCategory = params?.get('category');

    if (pathname !== '/') {
        return null;
    }

    return (
        <Container>
            <div className="flex flex-row items-center flex-nowrap justify-between overflow-x-auto pt-4">
                {categories.map(({ label, icon }) => <CategoryBox key={label} label={label} icon={icon} view="Tab" selected={label === selectedCategory} onClick={toggleCategory} />)}
            </div>
        </Container>
    )
}