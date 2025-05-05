import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface FavoriteState {
  ids: number[];
}

const initialState: FavoriteState = {
  ids: [],
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const index = state.ids.indexOf(action.payload);
      if (index !== -1) {
        state.ids.splice(index, 1); // Remove
      } else {
        state.ids.push(action.payload); // Add
      }
    },
  },
});

export const {toggleFavorite} = favoriteSlice.actions;

export const selectFavorites = (state: any) => state.favorites.ids;

export default favoriteSlice.reducer;
