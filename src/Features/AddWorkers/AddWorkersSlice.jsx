import { createSlice, nanoid } from '@reduxjs/toolkit'


const initialState = {
    workers: []
}

export const workersSlice = createSlice({
    name: 'workers',
    initialState,
    reducers: {
        getWorkers: (state, action) => {
            state.workers.push(action.payload)
        },
        deletWorkers: (state, action) => {
            state.workers = state.workers.filter(worker => worker.name !== action.payload.name)
        },
        changeChecked: (state, action) => {
            state.workers.forEach(worker => {
                if (worker.name === action.payload.name) {
                    worker.day_and_shifts.forEach(item => {
                        if (item.day === action.payload.day) {
                            if (action.payload.shift === "morning_shift")
                                item.shifts.morning_shift = !item.shifts.morning_shift
                            else if (action.payload.shift === "lunch_shift")
                                item.shifts.lunch_shift = !item.shifts.lunch_shift
                            else if (action.payload.shift === "night_shift")
                                item.shifts.night_shift = !item.shifts.night_shift
                        }
                    })
                }
            })
        },
    },
})


export const { getWorkers, deletWorkers, changeChecked } = workersSlice.actions

export default workersSlice.reducer