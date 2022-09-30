import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, InputText } from 'react-windows-ui'
import { getWorkersCount } from './WorkerCountSlice'


const WorkerCount = () => {

    const dispatch = useDispatch()
    const activityShifts = useSelector(state => state.activityPlace.typeOfShifts)
    const workersCount = useSelector(state => state.workerCount.workerPerShift)

    const sendWotkerCount = (_count, _shift) => {
        dispatch(getWorkersCount({
            shift: _shift,
            count: _count
        }))
    }

    return (
        <div>
            <Card
                padding={25}
                focused={true}
                display="flow-root">
            <h6 className='display-6 mb-2'>3. How many workers does each shift need?</h6>
            <br />
                <InputText
                    setStatus={+workersCount.morningCount > 0 ? "success" : activityShifts.morning_shift  && "danger"}
                    onChange={e => sendWotkerCount(e.target.value, "morning")}
                    type='number'
                    disabled={activityShifts.morning_shift  === false}
                    value={+workersCount.morningCount}
                    width={225}
                    label={'⛅️'}
                    placeholder="Enter a text"
                />

                <br /> <br />
                <InputText
                
                    setStatus={+workersCount.lunchCount > 0 ? "success" : activityShifts.lunch_shift && "danger"}
                    onChange={e => sendWotkerCount(e.target.value, "lunch")}
                    type='number'
                    disabled={activityShifts.lunch_shift === false}
                    value={+workersCount.lunchCount}
                    width={225}
                    label={'☀️'}
                    placeholder="Enter a text"
                />
                <br /> <br />

                <InputText
                    setStatus={+workersCount.nightCount > 0 ? "success" : activityShifts.night_shift && "danger"}
                    onChange={e => sendWotkerCount(e.target.value, "night")}
                    type='number'
                    disabled={activityShifts.night_shift  === false}
                    value={+workersCount.nightCount}
                    width={225}
                    label={'🌙'}
                    placeholder="Enter a text"
                />
                <br /> <br />
                
            </Card>
            <br /> <br />
        </div>
    )
}

export default WorkerCount