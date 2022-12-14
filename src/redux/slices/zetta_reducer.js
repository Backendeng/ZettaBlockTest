import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  del_status: false,
  sortstatus: false,
  allData: [],
  paginationData: [],
  dataByID: {}
};

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.del_status = false;
    },

    // Get data via api.
    getDataSuccess(state, action) {
      state.isLoading = false;
      state.del_status = false;
      state.allData = action.payload;
    },

    // Get data by id.
    getDataByIDSuccess(state, action) {
      state.isLoading = false;
      state.dataByID = action.payload;
    },

    // Get data by id.
    getPaginationDataSuccess(state, action) {
      state.isLoading = false;
      state.paginationData = action.payload;
    },

    // delete data by id.
    deleteDataByIDSuccess(state, action) {
      state.isLoading = false;
      state.del_status = true;
    },

    // successs sort.
    getSortDataSuccess(state) {
      state.sortstatus = !state.sortstatus;
    },

    saveDataSuccess(state, action) {
      state.isLoading = true;
      state.del_status = false;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.del_status = false;
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
      await dispatch(slice.actions.getDataByIDSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteDatabyID(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`${BackgroundAPI}apis/${id}`);
      await dispatch(slice.actions.deleteDataByIDSuccess());
      dispatch(slice.actions.startLoading());
      const response1 = await axios.get(`${BackgroundAPI}apis`);
      await dispatch(slice.actions.getDataSuccess(response1.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPaginationData(start, end, sort, order) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `${BackgroundAPI}apis?sortBy=${sort}&order=${order}&page=${start}&limit=${end}`
      );
      dispatch(slice.actions.getPaginationDataSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getDatabySort(sort, order, start, end) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `${BackgroundAPI}apis?sortBy=${sort}&order=${order}&page=${start}&limit=${end}`
      );
      dispatch(slice.actions.getSortDataSuccess());
      dispatch(slice.actions.getPaginationDataSuccess(response.data));
      const responseAllData = await axios.get(
        `${BackgroundAPI}apis?sortBy=${sort}&order=${order}`
      );
      console.log(`${BackgroundAPI}apis?sortBy=${sort}&order=${order}`);
      dispatch(slice.actions.getDataSuccess(responseAllData.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function saveData(
  nameCreate,
  typeCreate,
  descriptionCreate,
  start,
  end
) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post(
        `${BackgroundAPI}apis?name=${nameCreate}&type=${typeCreate}&description=${descriptionCreate}`
      );
      await dispatch(slice.actions.saveDataSuccess());
      const response = await axios.get(
        `${BackgroundAPI}apis?page=${start}&limit=${end}`
      );
      await dispatch(slice.actions.getPaginationDataSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPaginationDataBySearch(start, end, search, sort, order) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `${BackgroundAPI}apis?search=${search}&sortBy=${sort}&order=${order}&page=${start}&limit=${end}`
      );
      const responseALLData = await axios.get(
        `${BackgroundAPI}apis?search=${search}`
      );
      dispatch(slice.actions.getDataSuccess(responseALLData.data));
      dispatch(slice.actions.getPaginationDataSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPaginationDataBySearchSort(start, end, search, sort, order) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `${BackgroundAPI}apis?search=${search}&sortBy=${sort}&order=${order}&page=${start}&limit=${end}`
      );
      const responseALLData = await axios.get(
        `${BackgroundAPI}apis?search=${search}`
      );
      dispatch(slice.actions.getSortDataSuccess());
      dispatch(slice.actions.getDataSuccess(responseALLData.data));
      dispatch(slice.actions.getPaginationDataSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// Reducer
export default slice.reducer;

// Actions
export const { getDataSuccess } = slice.actions;
