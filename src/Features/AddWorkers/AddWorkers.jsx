import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Checkbox, Button, InputText, ButtonIcon } from 'react-windows-ui'
import { deletWorkers, getWorkers, changeChecked } from './AddWorkersSlice';
import '../AutoArrangement/arrangmante.css'

let day_and_shifts_arr = [{
    day: null,
    shifts: {
        morning_shift: null,
        lunch_shift: null,
        night_shift: null
    }
}]
const arrActivityPlace = ["morning_shift", "lunch_shift", "night_shift"]
const arrDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const AddWorkers = () => {

    let duplication;
    let check_box_count = 0;
    let workerData;

    const dispatch = useDispatch()
    const workersCount = useSelector(state => state.workerCount.workerPerShift)
    const workers = useSelector(state => state.workers.workers)
    const [workerName, setWorkerName] = useState()
    const alertMassage = (
        +workersCount.morningCount +
        +workersCount.lunchCount +
        +workersCount.nightCount) - workers.length

    const initialTable = () => {
        day_and_shifts_arr = []

        for (let i = 0; i < arrDays.length; i++)
            day_and_shifts_arr.push({
                day: arrDays[i],
                shifts: {
                    morning_shift: false,
                    lunch_shift: false,
                    night_shift: false
                }
            })
    }

    const getDaysAndShifta = (_dey, _shift, _can_work) => {
        day_and_shifts_arr.forEach(item => {
            if (item.day === _dey)
                if (_shift === "morning_shift") {
                    if (item.shifts.morning_shift) item.shifts.morning_shift = false
                    else item.shifts.morning_shift = true
                }
                else if (_shift === "lunch_shift") {
                    if (item.shifts.lunch_shift) item.shifts.lunch_shift = false
                    else item.shifts.lunch_shift = true
                }
                else if (_shift === "night_shift") {
                    if (item.shifts.night_shift) item.shifts.night_shift = false
                    else item.shifts.night_shift = true
                }
        })
    }

    const getWorkerData = () => {
        duplication = false;

        workers.forEach(worker => {
            if (worker.name.trim() === workerName.trim()) {
                duplication = true
            }
        })
        if (!duplication) {
            workerData = {
                name: workerName,
                day_and_shifts: day_and_shifts_arr
            }

            dispatch(getWorkers(workerData))

            for (let i = 0; i < check_box_count; i++)
                document.querySelector(`#check_box${i}`).checked = false

            initialTable()
        }
        else alert("the name is exsist")
    }

    const deleteWorkerByName = (_name) => {
        dispatch(deletWorkers({ name: _name }))
    }

    const checkAllTrue = () => {
        for (let i = 0; i < 21; i++)
            document.querySelector(`#check_box${i}`).checked = true

        day_and_shifts_arr.forEach(item => {
            item.shifts.morning_shift = true
            item.shifts.lunch_shift = true
            item.shifts.night_shift = true
        })
    }

    const changeCheckedMark = (_name, _checked, _day, _shift) => {
        dispatch(changeChecked({
            name: _name,
            checked: _checked,
            day: _day,
            shift: _shift
        }))
    }

    useEffect(() => {
        initialTable()
    }, [])

    return (
        <div>
            <Card
                padding={16}
                focused={true}
            >
                <br />
                {
                    alertMassage > 0 ? <div
                        class="alert alert-danger"
                        role="alert">
                        For full work arrangement You have to add
                        <strong style={{ color: 'red' }} > {alertMassage} </strong>
                        employees.
                    </div> : (alertMassage) === 0 ?
                        <div
                            class="alert alert-success"
                            role="alert">
                            You are all set!
                        </div> : <div
                            class="alert alert-danger"
                            role="alert">
                            You have <strong style={{ color: 'red' }}>{(alertMassage) * -1}</strong> redundant employees
                        </div>
                }
                <h6 className='display-6'>5. Adding your workers</h6>
                <br />
                <p>worker name</p>
                <InputText
                    onChange={e => setWorkerName(e.target.value)}
                    setStatus={workerName ? "success" : ""}
                    placeholder="Worker name"
                />

                <br /><br />
                <p>work constraints</p>
                <Button
                    disabled={!workerName}
                    value='Mark all'
                    type='primary'
                    onClick={checkAllTrue}
                    icon={<i className='icons10-checked-2' ></i>}
                />

                <br /><br />
                <table id='customers' >
                    <tr className=' border border-3'>
                        <th className='text-center'>day</th>
                        <th className='text-center'>morning</th>
                        <th className='text-center'>lunch</th>
                        <th className='text-center'>nigth</th>
                    </tr>
                    {
                        arrDays.map(day => <tr className='border border-3'>
                            <td className='text-center'>{day}</td>
                            {
                                arrActivityPlace.map(shift => <td>
                                    <input
                                        style={{ width: '100%', height: 20 }}
                                        id={`check_box${check_box_count++}`}
                                        type="checkbox"
                                        tooltip="inline checkbox"
                                        value={shift}
                                        onChange={e => getDaysAndShifta(day, shift, e.target.checked)}
                                    />
                                </td>
                                )
                            }
                        </tr>
                        )
                    }
                </table>
                <br />
                <Button
                    disabled={!workerName}
                    type='success'
                    onClick={getWorkerData}
                    value='Add'
                    icon={<i className='icons10-user-add'></i>}
                />
                {
                    workers.length > 0 && <Button
                        disabled={workers.length < 0}
                        type='success-outline'
                        onClick={() => window.location = "#workers_table"}
                        value='See your workers'

                        icon={<i className='icons10-user-group'></i>}
                    />
                }
            </Card>
            <br />
            
            {
                workers.length > 0 && <Card
                    padding={25}
                    focused={true}
                    display="flow-root"
                    className=''>
                    <h2 className='display-6'>Constraints</h2>
                    <div
                        class="alert alert-success"
                        role="alert">
                        <i className='icons10-touch'></i> You can change the shift status by clicking on it!
                    </div>
                    <div id='workers_table' className='row'>
                        {
                            workers.map(worker => <section className='col-sm-3 m-2 '>
                                <ButtonIcon
                                    onClick={() => deleteWorkerByName(worker.name)}
                                    tooltip="Some tooltip text"
                                    icon={<i className="icons10-trash color-danger"></i>}
                                />
                                <strong>{worker.name}</strong>
                                <table id='customers'>
                                    <tr className='border border-3'>
                                        <th>day</th>
                                        <th>morning</th>
                                        <th>lunch</th>
                                        <th>nigth</th>
                                    </tr>
                                    <tr>
                                    </tr>
                                    {worker.day_and_shifts.map(x => <tr className='border border-3'>
                                        <td>
                                            {x.day}
                                        </td>
                                        <td
                                            style={{ color: x.shifts.morning_shift ? 'green' : 'red' }}
                                            onClick={() => changeCheckedMark(
                                                worker.name,
                                                x.shifts.morning_shift,
                                                x.day,
                                                "morning_shift"
                                            )}
                                        >
                                            {x.shifts.morning_shift ? <i className='icons10-checkmark' ></i> :
                                                <i className='icons10-cross'></i>
                                            }

                                        </td>
                                        <td
                                            style={{ color: x.shifts.lunch_shift ? 'green' : 'red' }}
                                            onClick={() => changeCheckedMark(
                                                worker.name,
                                                x.shifts.lunch_shift,
                                                x.day,
                                                "lunch_shift"
                                            )}
                                        >
                                            {x.shifts.lunch_shift ? <i className='icons10-checkmark' ></i> :
                                                <i className='icons10-cross'></i>
                                            }
                                        </td>
                                        <td
                                            style={{ color: x.shifts.night_shift ? 'green' : 'red' }}
                                            onClick={() => changeCheckedMark(
                                                worker.name,
                                                x.shifts.night_shift,
                                                x.day,
                                                "night_shift"
                                            )}
                                        >
                                            {x.shifts.night_shift ? <i className='icons10-checkmark' ></i> :
                                                <i className='icons10-cross'></i>
                                            }
                                        </td>
                                    </tr>
                                    )}
                                    <br />
                                    <br />
                                </table>
                            </section>
                            )}
                    </div>
                </Card>
            }
        </div>
    )
}

export default AddWorkers