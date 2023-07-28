import React from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
  onClick: (value: string) => void;
  label: string;
  selected?: boolean;
  icon: IconType;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  onClick,
  label,
  selected,
  icon: Icon,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        flex 
        cursor-pointer
        flex-col 
        items-center
        gap-3
        rounded-xl
        border-2
        p-4
        transition
        hover:border-black
        ${selected ? "border-black" : "border-neutral-200"}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
