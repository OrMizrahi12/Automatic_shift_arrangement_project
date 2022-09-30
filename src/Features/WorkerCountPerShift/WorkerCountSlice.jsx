import { createSlice, nanoid } from '@reduxjs/toolkit'


const initialState = {
    workerPerShift: {
        morningCount: 0,
        lunchCount: 0,
        nightCount: 0,
    }
}

export const workersCountSlice = createSlice({
    name: 'workerPerShift',
    initialState,
    reducers: {
        getWorkersCount: (state, action) => {
            if (action.payload.shift === "morning" && action.payload.count >= 0 )
                state.workerPerShift.morningCount = action.payload.count
            else if (action.payload.shift === "lunch"  && action.payload.count >= 0 )
                state.workerPerShift.lunchCount = action.payload.count
            else if (action.payload.shift === "night"  && action.payload.count >= 0 )
                state.workerPerShift.nightCount = action.payload.count
        },
    },
})


export const { getWorkersCount } = workersCountSlice.actions

export default workersCountSlice.reducer