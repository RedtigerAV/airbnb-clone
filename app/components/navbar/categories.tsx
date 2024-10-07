'use client';

import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import Container from "../container/container";
import CategoryBox from "../category-box/category-box";
import { usePathname, useSearchParams } from "next/navigation";
import { useToggleCategory } from "@/app/hooks/use-toggle-category";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

export const categories = [
    {
        label: "Beach",
        icon: TbBeach,
        description: "This property is close to the beach!"
    },
    {
        label: "Windmills",
        icon: GiWindmill,
        description: "This property has windmills!"
    },
    {
        label: "Modern",
        icon: MdOutlineVilla,
        description: "This property is modern!"
    },
    {
        label: "Countryside",
        icon: TbMountain,
        description: "This property is in the countryside!!"
    },
    {
        label: "Pools",
        icon: TbPool,
        description: "This property has a pool!"
    },
    {
        label: "Islands",
        icon: GiIsland,
        description: "This property is on an island!"
    },
    {
        label: "Lake",
        icon: GiBoatFishing,
        description: "This property is close to a lake!"
    },
    {
        label: "Skiing",
        icon: FaSkiing,
        description: "This property has skiing activites!"
    },
    {
        label: "Castles",
        icon: GiCastle,
        description: "This property is in a castle!"
    },
    {
        label: "Camping",
        icon: GiForestCamp,
        description: "This property has camping activites!"
    },
    {
        label: "Arctic",
        icon: BsSnow,
        description: "This property is in the Arctic!"
    },
    {
        label: "Cave",
        icon: GiCaveEntrance,
        description: "This property is in a cave!"
    },
    {
        label: "Desert",
        icon: GiCactus,
        description: "This property is in the desert!"
    },
    {
        label: "Barns",
        icon: GiBarn,
        description: "This property is in the barn!"
    },
    {
        label: "Lux",
        icon: IoDiamond,
        description: "This property is luxurious!"
    },
]

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
                {categories.map(({ label, icon }) => <CategoryBox key={label} label={label} icon={icon} selected={label === selectedCategory} onClick={toggleCategory} />)}
            </div>
        </Container>
    )
}