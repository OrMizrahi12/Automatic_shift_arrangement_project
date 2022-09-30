import { configureStore } from '@reduxjs/toolkit'
import WorkPlaceReducer from '../Features/WorkPlace/WorkPlaceSlice'
import ActivityPlaceReducer from '../Features/ActivityPlace/ActivityPlaceSlice'
import ActivityDaysPlaceReducer from '../Features/ActivityDaysPlace/ActivityDaysPlaceSlice'
import workersReducer from '../Features/AddWorkers/AddWorkersSlice'
import WorkerCountReducer from '../Features/WorkerCountPerShift/WorkerCountSlice'
import ClickForStartReducer from '../Features/ClickForStart/ClickForStartSlice'

export const store = configureStore({

  reducer: {

    workPlace: WorkPlaceReducer,
    activityPlace: ActivityPlaceReducer,
    activityDays: ActivityDaysPlaceReducer,
    workers: workersReducer,
    workerCount: WorkerCountReducer,
    getClick: ClickForStartReducer
    

  },
})

