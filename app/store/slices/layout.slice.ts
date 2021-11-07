import { createSlice } from '@reduxjs/toolkit';

interface LayoutState {
  isModalOpened: boolean;
}

const initialState: LayoutState = {
  isModalOpened: false,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    switchModal: (state) => {
      state.isModalOpened = !state.isModalOpened;
    },
  },
});

export const layoutActions = layoutSlice.actions;
export default layoutSlice.reducer;
