import React, { useState } from 'react'
import { InputText, Button, Card } from "react-windows-ui";
import { useSelector, useDispatch } from 'react-redux'
import { getWorkPlaceName } from './WorkPlaceSlice'

const WorkPlace = () => {

    const dispatch = useDispatch()
    const theWorkPlaceName = useSelector(state => state.workPlace.workPlaceName)
    
    const sendWorkPlaceName = (_workPlaceName) => {
        dispatch(getWorkPlaceName(_workPlaceName))
    }

    return (
        <div>
            <Card
                padding={16}
                focused={true}
            >
                <h3 className='display-6'>1. Add work place name</h3>
                <br />
                <InputText
                    setStatus={theWorkPlaceName ? "success" : ""}
                    value={theWorkPlaceName}
                    onChange={e => sendWorkPlaceName(e.target.value)}
                    placeholder="Here..."
                    tooltip="InputText tooltip title"
                />
                <br />
                <br />
            </Card>
        </div>
    )
}

export default WorkPlace