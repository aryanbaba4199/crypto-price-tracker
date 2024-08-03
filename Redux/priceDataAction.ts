import { AppDispatch } from '@/Redux/store';
import { setPriceData, setSelectedSymbol } from '@/Redux/priceDataSlice';

export const fetchData = (symbol: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`/api/getData?symbol=${symbol}`);
    const data = await response.json();
    if (data.success) {
      dispatch(setPriceData(data.data));
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

export const changeSymbol = (symbol: string) => (dispatch: AppDispatch) => {
  dispatch(setSelectedSymbol(symbol));
  dispatch(fetchData(symbol));
};
