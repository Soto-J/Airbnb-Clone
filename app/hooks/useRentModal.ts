import { create } from "zustand";

interface RentModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useRentModal = create<RentModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useRentModal;
