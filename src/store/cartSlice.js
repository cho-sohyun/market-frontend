import { createSlice } from '@reduxjs/toolkit';

const cartInitialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    addItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (itemIndex >= 0) {
        // 같은 아이템이 이미 장바구니에 있음
        // 수량 변경
        state.items[itemIndex].quantity = action.payload.quantity;
      } else {
        // 같은 아이템이 장바구니에 없음
        // 아이템 추가
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
