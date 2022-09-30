import { createSlice, nanoid } from '@reduxjs/toolkit'


const initialState = {
  getClick: false
}

export const clickForStart = createSlice({
    name: 'workerPerShift',
    initialState,
    reducers: {
        getClickForStart: (state, action) => {
          state.getClick = true;
        },
    },
})


export const { getClickForStart } = clickForStart.actions

export default clickForStart.reducer