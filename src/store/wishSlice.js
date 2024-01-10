import { createSlice } from '@reduxjs/toolkit';

const wishInitialState = {
  items: [],
};

const wishSlice = createSlice({
  name: 'wish',
  initialState: wishInitialState,
  reducers: {
    addItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (itemIndex < 0) {
        // 같은 아이템이 없음
        // 아이템 추가
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, removeItem, setWishList } = wishSlice.actions;

export default wishSlice.reducer;
