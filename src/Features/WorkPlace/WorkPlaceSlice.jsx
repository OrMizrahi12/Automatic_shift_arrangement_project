import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  workPlaceName: null,
}

export const WorkPlaceSlice = createSlice({
  name: 'workPlace',
  initialState,
  reducers: {
    getWorkPlaceName: (state,action) => {
      state.workPlaceName = action.payload;
    },
  },
})


export const { getWorkPlaceName } = WorkPlaceSlice.actions

export default WorkPlaceSlice.reducer