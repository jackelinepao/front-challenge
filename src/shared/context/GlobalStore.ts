import { create } from "zustand";
import { ViewEnum } from "../Enums/enums";

type State = {
  view: `${ViewEnum}`;
  setView: (view: `${ViewEnum}`) => void;
};

export const useGlobalStore = create<State>((set) => ({
  view: "LIST",
  setView: (view) => set({ view }),
}));
