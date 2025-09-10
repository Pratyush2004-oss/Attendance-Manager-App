import { BatchForTeacherType } from "@/types";
import { create } from "zustand";

interface BatchStoreInterface {
  selectedBatch: BatchForTeacherType | null;
  setSelectedBatch: (batch: BatchForTeacherType) => void;
}

export const useBatchStore = create<BatchStoreInterface>((set, get) => ({
  selectedBatch: null,
  setSelectedBatch: (batch) => set({ selectedBatch: batch }),
}));
