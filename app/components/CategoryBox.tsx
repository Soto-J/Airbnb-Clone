"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
// npm install query-string
import queryString from "query-string";

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  icon: Icon,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    if (!params) {
      const url = queryString.stringifyUrl({
        url: "/",
        query: { category: label },
      });

      router.push(url);
      return;
    }

    // If params exist, parse them into an object
    const currentQuery = queryString.parse(params.toString());
    
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = queryString.stringifyUrl({
      url: "/",
      query: updatedQuery,
    });

    router.push(url);
  }, [label, params, router]);
  // const handleClick = useCallback(() => {
  //   let currentQuery = {};
  //   // If params exist, parse them into an object
  //   if (params) {
  //     currentQuery = queryString.parse(params.toString());
  //   }

  //   const updatedQuery: any = {
  //     ...currentQuery,
  //     category: label,
  //   };

  //   // Check if category is already selected
  //   if (params?.get("category") === label) {
  //     delete updatedQuery.category;
  //   }

  //   // Create new url with updated query
  //   const url = queryString.stringifyUrl(
  //     {
  //       url: "/",
  //       query: updatedQuery,
  //     },
  //     { skipNull: true }
  //   );

  //   router.push(url);
  // }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex
        cursor-pointer
        flex-col
        items-center
        justify-center
        gap-2
        border-b-2
        p-3
        transition
        hover:text-neutral-500
        ${selected ? "border-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-nuetral-500"}
      `}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

export default CategoryBox;
