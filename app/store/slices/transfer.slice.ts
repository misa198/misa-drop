import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TransferStatus =
  | 'transferring'
  | 'pending'
  | 'denied'
  | 'completed'
  | 'canceled';
interface TransferState {
  numberOfPaths: number;
  paths: string[];
  from: string;
  to: string;
  fileSize: string;
  fileName: string;
  status?: TransferStatus;
  fileContent?: string;
}

const initialState: TransferState = {
  numberOfPaths: 0,
  paths: [],
  from: '',
  to: '',
  fileSize: '',
  fileName: '',
};

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
      state.paths.push(action.payload);
    },
    resetTransferState: (state) => {
      state.numberOfPaths = 0;
      state.paths = [];
      state.from = '';
      state.to = '';
      state.fileSize = '';
      state.fileName = '';
      state.status = undefined;
      state.fileContent = undefined;
    },
  },
});

export const transferActions = transferSlide.actions;
export default transferSlide.reducer;
