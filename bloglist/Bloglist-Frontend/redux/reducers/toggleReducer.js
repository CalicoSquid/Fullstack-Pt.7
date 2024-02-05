import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    isOpen: true,
  },
  reducers: {
    toggle(state) {
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    },
  },
});

export const { toggle } = toggleSlice.actions;
export default toggleSlice.reducer;
