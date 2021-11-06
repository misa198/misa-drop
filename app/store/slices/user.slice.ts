import { createSlice } from '@reduxjs/toolkit';
import { getRandomAnimal } from '../../../utils/animals';
import { fetchIpToken } from '../thunks/user.thunk';

interface UserState {
  name: string;
  color: string;
  token: string;
  error: boolean;
}

const initialState: UserState = {
  name: '',
  color: '',
  token: '',
  error: false,
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
  extraReducers: (builder) => {
    builder.addCase(fetchIpToken.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(fetchIpToken.rejected, (state) => {
      state.error = true;
    });
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
