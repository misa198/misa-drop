import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TransferStatus =
  | 'transferring'
  | 'pending'
  | 'denied'
  | 'completed'
  | 'canceled';
interface TransferState {
  numberOfPaths?: number;
  paths?: string[];
  from?: string;
  to?: string;
  fileSize?: string;
  fileName?: string;
  status?: TransferStatus;
  fileContent?: string;
}

const initialState: TransferState = {};

const transferSlide = createSlice({
  name: 'transfer',
  initialState,
  reducers: {
    setTransferStatus(state, action: PayloadAction<TransferStatus>) {
      state.status = action.payload;
    },
    setFileContent: (state, action: PayloadAction<string>) => {
      state.fileContent = action.payload;
    },
    setNewRequest: (
      state,
      action: PayloadAction<{
        numberOfPaths: number;
        from: string;
        to: string;
        fileSize: string;
        fileName: string;
      }>,
    ) => {
      state.numberOfPaths = action.payload.numberOfPaths;
      state.from = action.payload.from;
      state.fileSize = action.payload.fileSize;
      state.fileName = action.payload.fileName;
      state.to = action.payload.to;
      state.status = 'pending';
    },
    addNewPath: (state, action: PayloadAction<string>) => {
      state.paths = state.paths
        ? [...state.paths, action.payload]
        : [action.payload];
    },
    resetTransferState: (state) => {
      state.numberOfPaths = undefined;
      state.paths = undefined;
      state.from = undefined;
      state.to = undefined;
      state.fileSize = undefined;
      state.status = undefined;
      state.fileName = undefined;
      state.fileContent = undefined;
    },
  },
});

export const transferActions = transferSlide.actions;
export default transferSlide.reducer;
