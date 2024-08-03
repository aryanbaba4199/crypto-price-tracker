import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PriceDataEntry {
  symbol: string;
  price: number;
  timestamp: string;
}

interface PriceDataState {
  data: PriceDataEntry[];
  selectedSymbol: string;
}

const initialState: PriceDataState = {
  data: [],
  selectedSymbol: 'bitcoin',
};

const priceDataSlice = createSlice({
  name: 'priceData',
  initialState,
  reducers: {
    setPriceData(state, action: PayloadAction<PriceDataEntry[]>) {
      state.data = action.payload;
    },
    setSelectedSymbol(state, action: PayloadAction<string>) {
      state.selectedSymbol = action.payload;
    },
  },
});

export const { setPriceData, setSelectedSymbol } = priceDataSlice.actions;
export default priceDataSlice.reducer;
