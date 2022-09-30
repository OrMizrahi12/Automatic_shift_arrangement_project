import WorkPlace from '../Features/WorkPlace/WorkPlace';
import ActivityPlace from '../Features/ActivityPlace/ActivityPlace';
import ActivityDaysPlace from '../Features/ActivityDaysPlace/ActivityDaysPlace';
import AddWorkers from '../Features/AddWorkers/AddWorkers';
import AutoArrangement from '../Features/AutoArrangement/AutoArrangement';
import { useState } from 'react';
import WorkerCount from '../Features/WorkerCountPerShift/WorkerCount';
import { Button, NavPageContainer } from "react-windows-ui";
import { ProgressBar } from "react-windows-ui";
import { useSelector } from 'react-redux';

const Main = () => {

    const theWorkPlaceName = useSelector(state => state.workPlace.workPlaceName)
    const activityShifts = useSelector(state => state.activityPlace.typeOfShifts)
    const workersCount = useSelector(state => state.workerCount.workerPerShift)
    const activityDays = useSelector(state => state.activityDays.activityDays)
    const workers = useSelector(state => state.workers.workers)

    const [number, setNumber] = useState(0)
    const [prograser, setPrograser] = useState(0)

    const step1 = theWorkPlaceName
    const step2 = activityShifts.morning_shift === true && workersCount.morningCount === 0 ||
        activityShifts.lunch_shift === true && workersCount.lunchCount === 0 ||
        activityShifts.night_shift === true && workersCount.nightCount === 0
    const step3 = activityDays.length < 1
    const step4 = workers.length <= 0

    const minus = () => {
        if (number > 0) {
            setNumber(number - 1)
            setPrograser(prograser - 25)
        }
    }

    const plus = () => {
        if (number < 4) {
            if (number === 0) {
                if (step1) {
                    setPrograser(prograser + 25)
                    setNumber(number + 1)
                }
                else alert("Fill the name")
            }
            else if (number === 1) {
                if (step2)
                    alert("You won't be able to approve a shift and not define how many workers it needs")
                else if (!activityShifts.morning_shift && !activityShifts.lunch_shift && !activityShifts.night_shift)
                    alert("You could not continue without marking at least one shift.")
                else {
                    setPrograser(prograser + 25)
                    setNumber(number + 1)
                }
            }
            else if (number === 2) {
                if (step3) alert("You must open at least one day.")
                else {
                    setPrograser(prograser + 25)
                    setNumber(number + 1)
                }
            }
            else if (number === 3) {
                if (step4) alert("You need to add at least one employee.")
                else {
                    setPrograser(prograser + 25)
                    setNumber(number + 1)
                }
            }

        }
    }
    return (
        <div className="container">
            <br /><br />
            {prograser}%
            <ProgressBar
                setProgress={prograser}
                height={20}
                tooltip="ProgressBar tooltip title"
                color={prograser === 100 && '#2C8B2C'}
            />
            <br />
            <div className='divBtn mt-2 mb-2'>
                <Button
                    value=''
                    icon={<i className="icons10-arrow-left"></i>}
                    style={{ backgroundColor: 'silver', color: 'white' }}
                    onClick={minus}
                    disabled={number === 0}
                />

                {
                    number <= 3 && <Button
                        type={number < 3 ? 'primary' : 'success'}
                        value={number === 3 && "Get the arrangement"}
                        icon={<i className="icons10-arrow-right"></i>}

                        onClick={plus}
                    />
                }
            </div>
            {number === 0 && <WorkPlace />}
            {number === 1 && <><ActivityPlace /> <br /><WorkerCount /></>}
            {number === 2 && <ActivityDaysPlace />}
            {number === 3 && <AddWorkers />}
            {number === 4 && <AutoArrangement />}

        </div>
    )
}

export default Main