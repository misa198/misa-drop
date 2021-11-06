import { createSlice } from '@reduxjs/toolkit';
import { getRandomAnimal } from '../../../utils/animals';

interface UserState {
  name: string;
  color: string;
}

const initialState: UserState = {
  name: '',
  color: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state) {
      const { name, color } = getRandomAnimal();
      state.name = name;
      state.color = color;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
