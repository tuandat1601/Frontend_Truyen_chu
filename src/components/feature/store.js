import { configureStore } from '@reduxjs/toolkit'
import storeSlice from './slice';
export default configureStore({
	reducer:{
		context:storeSlice,
	}
})