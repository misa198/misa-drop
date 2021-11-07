import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room, User } from '../../../models/Room';
import { getRandomAnimal } from '../../../utils/animals';
import { fetchIpToken } from '../thunks/user.thunk';

interface UserState {
  name: string;
  color: string;
  token: string;
  error: boolean;
  guests: User[];
}

const initialState: UserState = {
  name: '',
  color: '',
  token: '',
  error: false,
  guests: [],
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
    setGuests(state, action: PayloadAction<Room>) {
      const users = action.payload.users;
      const guests = users.filter((user) => user.id !== state.token);
      state.guests = guests;
    },
    addGuest(state, action: PayloadAction<User>) {
      state.guests.push(action.payload);
    },
    removeGuest(state, action: PayloadAction<string>) {
      const guests = state.guests.filter(
        (guest) => guest.id !== action.payload,
      );
      state.guests = guests;
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
