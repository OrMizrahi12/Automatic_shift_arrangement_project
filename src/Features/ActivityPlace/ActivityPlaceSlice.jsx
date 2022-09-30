import { createSlice, nanoid } from '@reduxjs/toolkit'


const initialState = {
    typeOfShifts: {
        morning_shift: false,
        lunch_shift: false,
        night_shift: false
    }
}

export const ActivityPlaceSlice = createSlice({
    name: 'typeOfShifts',
    initialState,
    reducers: {
        getActivityPlace: (state, action) => {
            if (action.payload === "morning_shift")
                state.typeOfShifts.morning_shift = !state.typeOfShifts.morning_shift
            else if (action.payload === "lunch_shift")
                state.typeOfShifts.lunch_shift = !state.typeOfShifts.lunch_shift
            else if (action.payload === "night_shift")
                state.typeOfShifts.night_shift = !state.typeOfShifts.night_shift
        },
    },
})


export const { getActivityPlace } = ActivityPlaceSlice.actions

export default ActivityPlaceSlice.reducer