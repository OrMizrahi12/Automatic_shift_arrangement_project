import React from 'react'
import { Button, Card } from 'react-windows-ui';
import { useDispatch } from 'react-redux';
import '../App.css';
import "react-windows-ui/config/app-config.css";
import "react-windows-ui/dist/react-windows-ui.min.css";
import "react-windows-ui/icons/fonts/fonts.min.css";
import img from '../img/arangmane.png'
import { getClickForStart } from '../Features/ClickForStart/ClickForStartSlice';


const WellcomePaga = (props) => {

    const dispatch = useDispatch()
    
    const sendClickForStart = () => {
        dispatch(getClickForStart())
    }

    return (
        <div >
            <Card
                padding={16}
                margin={20}
                focused={true}
                display="flow-root">
                <img width={100} height={100} src={img} alt="" />
                <h6 className='display-6 m-1'>Automatic shifts arrangement</h6>
                <br />
                <p><i className='icons10-location-point'></i> Define workplace and hours of operation</p>
                <p><i className='icons10-numbered-list'></i> Define the number of workers per shift</p>
                <p><i className='icons10-todo-list'></i> Define work constraints</p>
                <p><i className='icons10-finish-flag'></i> And..that's it. You will receive a work arrangement.</p>
                <br />
                <Button
                    type='primary-outline'
                    value='Lets make it esey >>>'
                    onClick={sendClickForStart} >
                </Button>
            </Card>

        </div>
    )
}

export default WellcomePaga