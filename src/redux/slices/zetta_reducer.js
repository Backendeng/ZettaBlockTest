import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  allData: [],
  dataByID: {}
};

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // Get data via api.
    getDataSuccess(state, action) {
      state.isLoading = false;
      state.allData = action.payload;
    },

    // Get data by id.
    getDataByIDSuccess(state, action) {
      state.isLoading = false;
      state.dataByID = action.payload;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

const BackgroundAPI = 'https://62a6bb9697b6156bff7e6251.mockapi.io/v1/';

export function getAllDatas() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${BackgroundAPI}apis`);
      dispatch(slice.actions.getDataSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getDatabyID(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${BackgroundAPI}apis/${id}`);
      dispatch(slice.actions.getDataByIDSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// Reducer
export default slice.reducer;

// Actions
export const { getDataSuccess } = slice.actions;
