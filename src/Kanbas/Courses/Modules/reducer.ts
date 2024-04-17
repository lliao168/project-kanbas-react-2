import { createSlice } from "@reduxjs/toolkit";
import { modules } from "../../Database";
import { PayloadAction } from "@reduxjs/toolkit";

interface Module {
  _id?: string;
  name: string;
  description: string;
  category: string;
  category2: string;
  category3: string;
}
const initialState = {
  modules: [] as Module[],
  module: { name: "New Module", description: "New Description", category: "New Category 1", category2: "New Category 2", category3: "New Category 3" },
};


const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    addModule: (state, action) => {
      state.modules = [action.payload, ...state.modules];
    },
    deleteModule: (state, action) => {
      state.modules = state.modules.filter(
        (module) => module._id !== action.payload
      );
    },
    updateModule: (state, action) => {
      state.modules = state.modules.map((module) => {
        if (module._id === action.payload._id) {
          return action.payload;
        } else {
          return module;
        }
      });
    },
    setModule: (state, action) => {
      state.module = action.payload;
    },
  },
});


export const { addModule, deleteModule,
  updateModule, setModule, setModules } = modulesSlice.actions;
export default modulesSlice.reducer;

