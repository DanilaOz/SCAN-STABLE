import { configureStore, createSlice } from "@reduxjs/toolkit";

const TOKEN = localStorage.getItem("accessToken");
const HISTOGRAMS = localStorage.getItem("histograms");
const PUBLICATIONS = localStorage.getItem("publications");

const loginSlice = createSlice({
  name: "isUserLogged",
  initialState: TOKEN ? { value: true } : { value: false },
  reducers: {
    login: (state) => {
      state.value = !state.value;
    },
    logout: (state) => {
      state.value = !state.value;
    },
  },
});

const tokenSlice = createSlice({
  name: "token",
  initialState: { value: TOKEN },
  reducers: {
    getToken: (state, action) => { state.value = action.payload },
    removeToken: (state, action) => { state.value = action.payload }
  }
})

const histogramsSlice = createSlice({
  name: 'histograms',
  initialState: HISTOGRAMS ? {value: JSON.parse(HISTOGRAMS)} : { value: null },
  reducers: {
    getHistograms: (state, action) => { state.value = action.payload }
  }
})

const publicationsSlice = createSlice({
  name: 'publications',
  initialState: PUBLICATIONS ? {value: JSON.parse(PUBLICATIONS)} : { value: null },
  reducers: {
    getPublications: (state, action) => { state.value = action.payload }
  }
})

export const { login, logout } = loginSlice.actions;
export const { getToken, removeToken } = tokenSlice.actions;
export const { getHistograms } = histogramsSlice.actions;
export const { getPublications } = publicationsSlice.actions;

export const store = configureStore({
  reducer: {
    isUserLogged: loginSlice.reducer,
    token: tokenSlice.reducer,
    histograms: histogramsSlice.reducer,
    publications: publicationsSlice.reducer
  },
});
