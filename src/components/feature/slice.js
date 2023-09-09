import { createSlice } from '@reduxjs/toolkit'

localStorage.setItem("user", JSON.stringify(""))
const user = JSON.parse(localStorage.getItem("user"))

const datas = null
const storeSlice = createSlice({
	name: "context",
	initialState: {
		user: user,
		isFetching: false,
		error: false,
	},
	reducers:
	{
		loginStart: (state) => {
			state.isFetching = true;

		},
		loginSuccess: (state, action) => {
			state.user = action.payload;
			state.isFetching = false;

		},
		loginFailure: (state) => {

			state.isFetching = false;
			state.error = true;

		},
		logOut: (state) => {
			state.user = null;
			state.isFetching = false;
			state.error = false;
		},
		dataSearch: (state, action) => {
			state.search = action.payload;
			state.isFetching = false;
		}



	}
})
export const { loginStart, loginFailure, loginSuccess, logOut,dataSearch } = storeSlice.actions;
export default storeSlice.reducer;