import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card } from 'react-windows-ui'
import './arrangmante.css'

let temp;
let arrRate = [{ rate: "", index: "" }]
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let ARR_ONE_OPTION = [{ day: "", morning_shift: [], lunch_shift: [], night_shift: [] }]
let ARR_ALL_OPTIONS = [];
let arrWorkersData = []

const AutoArrangement = () => {

  const workersCount = useSelector(state => state.workerCount.workerPerShift)
  const theWorkPlaceName = useSelector(state => state.workPlace.workPlaceName)
  const activityDays = useSelector(state => state.activityDays.activityDays)
  const activityShift = useSelector(state => state.activityPlace.typeOfShifts)
  const workers = useSelector(state => state.workers.workers)

  const [alert1, setAlert1] = useState(true)
  const [alert2, setAlert2] = useState(true)
  const [setAllBase, setSetAllBase] = useState([])

  let worker_count = 0

  const do_base_table_shists = () => {

    setSetAllBase([])
    arrWorkersData = []

    for (let i = 0; i < workers.length; i++)
      arrWorkersData.push(workers[i])

    ARR_ALL_OPTIONS = []
    ARR_ONE_OPTION = []

    for (let i = 0; i < days.length; i++)
      ARR_ONE_OPTION.push({
        day: days[i],
        morning_shift: [],
        lunch_shift: [],
        night_shift: [],
      })

    automatic_arrangement();
  }

  const automatic_arrangement = () => {

    for (let optaion = 0; optaion < arrWorkersData.length; optaion++) {
      arrWorkersData.forEach(Worker => {
        Worker.day_and_shifts.forEach((shift) => {

          // for morning shift -->
          if (shift.shifts.morning_shift && activityShift.morning_shift) {
            ARR_ONE_OPTION.forEach((shifts, index) => {
              if (+shifts.morning_shift.length < +workersCount.morningCount &&
                !shifts.lunch_shift.includes(Worker.name) && shift.day === shifts.day &&
                !shifts.night_shift.includes(Worker.name) && shift.day === shifts.day &&
                shift.day === shifts.day
                && !ARR_ONE_OPTION[index > 0 ? index - 1 : index].night_shift.includes(Worker.name) &&
                activityDays.includes(shifts.day)
              ) {
                worker_count = 0
                ARR_ONE_OPTION.forEach(item => {
                  if (item.morning_shift.includes(Worker.name)) worker_count++
                  if (item.lunch_shift.includes(Worker.name)) worker_count++
                  if (item.night_shift.includes(Worker.name)) worker_count++
                })
                if (worker_count < 6) shifts.morning_shift.push(Worker.name);
              }
            })
          }

          // for lunch shift --> 
          if (shift.shifts.lunch_shift && activityShift.lunch_shift) {
            ARR_ONE_OPTION.forEach(shifts => {
              if (+shifts.lunch_shift.length < +workersCount.lunchCount &&
                !shifts.morning_shift.includes(Worker.name) && shift.day === shifts.day &&
                !shifts.night_shift.includes(Worker.name) && shift.day === shifts.day &&
                shift.day === shifts.day && activityDays.includes(shifts.day)
              ) {
                worker_count = 0
                ARR_ONE_OPTION.forEach(item => {
                  if (item.morning_shift.includes(Worker.name)) worker_count++
                  if (item.lunch_shift.includes(Worker.name)) worker_count++
                  if (item.night_shift.includes(Worker.name)) worker_count++
                })
                if (worker_count < 6) shifts.lunch_shift.push(Worker.name);
              }
            })
          }

          // for night shift --> 
          if (shift.shifts.night_shift && activityShift.night_shift) {
            ARR_ONE_OPTION.forEach(shifts => {
              if (+shifts.night_shift.length < +workersCount.nightCount &&
                !shifts.morning_shift.includes(Worker.name) && shift.day === shifts.day &&
                !shifts.lunch_shift.includes(Worker.name) && shift.day === shifts.day &&
                shift.day === shifts.day && activityDays.includes(shifts.day)
              ) {
                worker_count = 0
                ARR_ONE_OPTION.forEach(item => {
                  if (item.morning_shift.includes(Worker.name)) worker_count++
                  if (item.lunch_shift.includes(Worker.name)) worker_count++
                  if (item.night_shift.includes(Worker.name)) worker_count++
                })
                if (worker_count < 6) shifts.night_shift.push(Worker.name);
              }
            })
          }
        })
      })

   
      temp = arrWorkersData[0]
      arrWorkersData.shift()
      arrWorkersData.push(temp)

      ARR_ALL_OPTIONS.push(ARR_ONE_OPTION)
      ARR_ONE_OPTION = []

      for (let i = 0; i < days.length; i++)
        ARR_ONE_OPTION.push({
          day: days[i],
          morning_shift: [],
          lunch_shift: [],
          night_shift: [],
        })

    }
    setSetAllBase(ARR_ALL_OPTIONS)
    findTheBest();
  }

  const findTheBest = () => {
    
    let count_workers = 0;
    arrRate = []
    
    ARR_ALL_OPTIONS.forEach((one_table, i) => {
      one_table.forEach(item => {
        count_workers += item.morning_shift.length
        count_workers += item.lunch_shift.length
        count_workers += item.night_shift.length
      })
      arrRate.push({ rate: count_workers, index: i })
      count_workers = 0
    })
    
    let temp = 0
    for (let i = 0; i < arrRate.length; i++)
      for (let j = 0; j < arrRate.length; j++)
        if (arrRate[j].rate < arrRate[i].rate) {
          temp = arrRate[i]
          arrRate[i] = arrRate[j]
          arrRate[j] = temp
        }

    arrRate = arrRate.filter(x => x.rate === arrRate[0].rate)

    for (let i = 0; i < arrRate.length; i++)
      arrRate[i] = arrRate[i].index
  }

  useEffect(() => {
    do_base_table_shists()
  }, [])

  return (

    <div>
      <Card
        padding={25}
        focused={true}
        display="flow-root">
        {
          alert1 && <div
            class="alert alert-warning"
            role="alert">
            <i className='icons10-info'> </i>
            <button onClick={() => setAlert1(false)} className='float-end btn btn'>X</button>
            The work arrangement is not complete?<br />
            <i className='icons10-checkmark'></i><strong> You can always go back to the previous steps and change the details.</strong> <br />
            <i className='icons10-refresh'></i> Your changes will change the work arrangement dynamically
          </div>
        }
        {
          alert2 && <div
            class="alert alert-warning"
            role="alert">
            <i className='icons10-info'> </i>
            <button style={{ paddingTop: -5 }} onClick={() => setAlert2(false)} className='float-end btn btn'>X</button>
            By law, it is allowed to hire an employee up to 6 shifts per week
          </div>
        }
        <h6
          className='display-6'>
          We found <strong style={{ color: 'green' }}> {workers.length}  </strong> option for shift arrangement for
          <strong>{" " + theWorkPlaceName}!</strong>
        </h6>
        <strong
          style={{ color: "rgb(84, 146, 84)" }}>
          <i className='icons10-trophy'></i> The green frames are the most recommended options
        </strong>
        <div className='row'>
          {
            setAllBase.map((option, i) => <table id='customers' className='col-sm-4 m-3 mx-auto' style={{ maxWidth: 160 }}>

              <h2><strong style={{ color: 'green' }}>#{i + 1}</strong></h2>
              <section
                className={arrRate.includes(i) ? "good-border" : "bad-border "}>
                <tr   >
                  <th>day</th>
                  <th>morning</th>
                  <th>lunch</th>
                  <th>night</th>
                </tr>
                {
                  option.map(arrangmant => <tr >
                    <td className='p-2'>{arrangmant.day}</td>
                    <td className='p-2'>{arrangmant.morning_shift.map(i => <> {i} <br /></>)}</td>
                    <td className='p-2'>{arrangmant.lunch_shift.map(i => <> {i} <br /></>)}</td>
                    <td className='p-2'>{arrangmant.night_shift.map(i => <> {i} <br /></>)}</td>
                  </tr>
                  )}
              </section>
            </table>
            )
          }
        </div>
      </Card>

    </div>
  )
}

export default AutoArrangement