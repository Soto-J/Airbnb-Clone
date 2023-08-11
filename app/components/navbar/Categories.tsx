"use client";
import { usePathname, useSearchParams } from "next/navigation";

import { IoDiamond } from "react-icons/io5";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";

import Container from "../Container";
import CategoryBox from "../CategoryBox";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This proptery is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This proptery has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This proptery is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This proptery is the country side!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This proptery has a pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This proptery is on a island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This proptery is close to a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This proptery is close to a lake!",
  },
  {
    label: "Castle",
    icon: GiCastle,
    description: "This proptery is in a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This proptery is in a castle!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This proptery is by the snow!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This proptery is in a cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This proptery is in the desert!",
  },
  {
    label: "Barn",
    icon: GiBarn,
    description: "This proptery is in the desert!",
  },
  {
    label: "Luxury",
    icon: IoDiamond,
    description: "This proptery is luxurious!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const pathname = usePathname();

  const category = params?.get("category");

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          flex
          flex-row
          items-center
          justify-between
          overflow-x-auto
          pt-4
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
