import { useEffect, useMemo, useCallback, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

import { SafeUser } from "../types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const isFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        if (isFavorited) {
          await axios.delete(`/api/favorites/${listingId}`);
        } else {
          await axios.post(`/api/favorites/${listingId}`);
        }

        router.refresh();
        toast.success("Listing favorited!");
      } catch (error: any) {
        toast.error("Somthing went wrong:", error.message);
      }
    },
    [currentUser, isFavorited, listingId, loginModal, router]
  );

  return {
    isFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
