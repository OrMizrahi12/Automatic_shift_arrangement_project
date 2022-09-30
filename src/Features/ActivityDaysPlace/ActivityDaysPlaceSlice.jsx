import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  activityDays: []
}

export const ActivityDaysSlice = createSlice({
  name: 'activityDays',
  initialState,
  reducers: {
    getActivityDays: (state, action) => {
      if (action.payload.checked)
        state.activityDays.push(action.payload.day)
      else if (!action.payload.checked)
        state.activityDays = state.activityDays.filter(day => day !== action.payload.day)
    },
  },
})

export const { getActivityDays } = ActivityDaysSlice.actions

export default ActivityDaysSlice.reducer