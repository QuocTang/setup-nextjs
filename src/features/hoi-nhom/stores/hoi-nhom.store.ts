import { SessionStorageConfigKeys } from "@/config/app-storage/session-storage.config";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type THoiNhomStore = {
  hoiNhomSearch: {
    per_page: number;
    khong_gian_id: string;
    flag: string;
    active_tab: string;
  };
  setHoiNhomSearch: (newSearch: THoiNhomSearchPayload) => void;
  isHydrated: boolean;
  setHydrated: (isHydrated: boolean) => void;
};

type THoiNhomSearchPayload = THoiNhomStore["hoiNhomSearch"];

const defaultState: THoiNhomSearchPayload = {
  per_page: 100,
  khong_gian_id: "",
  flag: "all",
  active_tab: "1",
};

export const useHoiNhomStore = create<THoiNhomStore>()(
  persist(
    (set) => ({
      hoiNhomSearch: defaultState,
      setHoiNhomSearch: (data) => set({ hoiNhomSearch: data }),
      isHydrated: false, // Cờ để kiểm tra trạng thái khôi phục
      setHydrated: (isHydrated: boolean) => set({ isHydrated }),
    }),
    {
      name: SessionStorageConfigKeys.features.hoi_nhom.hoi_nhom_search, // Tên key trong sessionStorage
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
