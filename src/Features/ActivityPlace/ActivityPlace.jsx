import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, Card } from "react-windows-ui";
import { getActivityPlace } from './ActivityPlaceSlice';

const ActivityPlace = () => {

    const dispatch = useDispatch()
    const activityShifts = useSelector(state => state.activityPlace.typeOfShifts)

    const sendActivityShift = (_typeShift) => {
        dispatch(getActivityPlace(_typeShift))
    }

    return (
        <div>
            <Card
                padding={25}
                focused={true}
            >
                <h6 className='display-6'>2. What kind of shifts characterize your place?</h6>
                <br />
                <Checkbox
                    defaultChecked={activityShifts.morning_shift && true}
                    value={activityShifts.morning_shift}
                    label={"Morning shift"}
                    onChange={e => sendActivityShift("morning_shift")}
                    
                />
                <br />
                <Checkbox
                    defaultChecked={activityShifts.lunch_shift && true}
                    value={activityShifts.lunch_shift}
                    label={"Lunch shift"}
                    onChange={e => sendActivityShift("lunch_shift")}
                />
                <br />
                <Checkbox
                    defaultChecked={activityShifts.night_shift && true}
                    value={activityShifts.night_shift}
                    label={"Night shift"}
                    onChange={e => sendActivityShift("night_shift")}
                />
                <br />
                <h5></h5>
            </Card>
        </div>
    )
}

export default ActivityPlace