import React from 'react'
import { useDispatch } from 'react-redux'
import { Checkbox, Card } from "react-windows-ui";
import { getActivityDays } from './ActivityDaysPlaceSlice';


const ActivityDaysPlace = () => {

    const dispatch = useDispatch()
    const arrDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    
    const sendActivityDays = (_day, _checked) => {
        dispatch(getActivityDays({ day: _day, checked: _checked }))
    }

    return (
        <div>
            <Card
                padding={16}

                focused={true}
            >
                <h6 className='display-6'>4. What are the working days of your business?</h6>
                <br />
                {
                    arrDays.map((day, i) => <>
                        <Checkbox
                            value={day}
                            label={day}
                            onChange={e => sendActivityDays(e.target.value, e.target.checked)}
                        />
                        <br />
                    </>
                    )
                }
            </Card>
        </div>
    )
}

export default ActivityDaysPlace