import React, {Component} from 'react'
import axios from 'axios'
import { DateRange } from 'react-date-range';
import TimePicker from 'react-time-picker'
import moment from 'moment'
moment().format("MMM Do YY")

class AddTime extends Component{
    constructor(props){
        super(props)
        this.state = {
            startDate: '',
            endDate: '',
            dates: [],
            includeWeekends: false,
            startTime: '9:00',
            endTime: '17:00',
            timeInterval: 60
        }
    }
    
    
    handleSelect = (date) => {
        console.log(date)
        // console.log(moment(date).format("MM/DD/YY dddd"));
        console.log(moment(date.startDate._d).format("MM/DD/YY dddd")); // Momentjs object
        // console.log(moment)
        this.setState({
            // startDate: 'today'
            startDate: moment(date.startDate._d).format("MM/DD/YY"),
            endDate: moment(date.endDate._d).format("MM/DD/YY")
        })
    }
    
    addDates = () => {
        let numOfDays = moment(this.state.endDate).diff(this.state.startDate, 'days')
        console.log('dateRange: ',numOfDays)
        let dateRange = []
        let currentDay = this.state.startDate
        for(let i=0; i <= numOfDays; i++){
            if(!this.state.includeWeekends){
                let dayOfWeek = moment(currentDay).format('dddd')
                if( dayOfWeek !== 'Sunday' && dayOfWeek !== 'Saturday'){
                    dateRange.push(moment(currentDay).format('MM/DD/YY'))
                }
            }else{
                dateRange.push(moment(currentDay).format('MM/DD/YY'))
            }
            currentDay = moment(currentDay).add(1, 'days')
        }
        console.log(dateRange)
        return(dateRange)
    }

    addTimeSlots = () => {
        let timeInterval = this.state.timeInterval
        let startTime = this.state.startTime.split(':')
            startTime = moment().hour(startTime[0]).minute(startTime[1])
        let endTime = this.state.endTime.split(':')
            endTime = moment().hour(endTime[0]).minute(endTime[1])
            console.log('time: ', moment(startTime), endTime)
            let minutes = moment(endTime).diff(moment(startTime), 'minutes')
            // console.log(minutes)
        let currentTimeSlot = startTime
        minutes /= timeInterval
        let timeSlots = []
        for(let i = 0; i < minutes; i++){
            timeSlots.push(currentTimeSlot.format('h:mm A'))
            currentTimeSlot.add(timeInterval, 'minutes')
        }
        console.log('timeSlots', timeSlots)
        return(timeSlots)
    }

    createTimeSlots = () => {
        const dateRange = this.addDates()
        const timeSlots = this.addTimeSlots()
        console.log('DATE RANGE: ', dateRange)
        console.log('TIMESLOTS: ', timeSlots)

        let promiseArr =[]
        for(let i = 0; i < dateRange.length; i++){
            for(let j = 0; j < timeSlots.length; j++){
                console.log(dateRange[i], timeSlots[j])
                promiseArr.push(axios.post('/api/time/add', {date: dateRange[i], time: timeSlots[j]}).then(res =>{
                    console.log('slot added')
                }))
            }
        }
        console.log(promiseArr)
        Promise.all(promiseArr).then(()=> console.log('hello')||this.props.updateToggle())
        .catch(err => console.log(err))
        // axios.post
    }

    setStartTime = time => this.setState({ startTime: time })

    setEndTime = time => this.setState({ endTime: time })

    render(){
        console.log(this.state)
        return(
            <div className='datePicker'>
                <h1 className='addDayTitle'>
                    Add New Day To Schedule
                </h1>
                <div className='dateCalendarWrapper'>
                    <div className='dateCalendar'>
                        <DateRange
                            format="MM/DD/YY"
                            onInit={this.handleSelect}
                            onChange={this.handleSelect}
                            calendars={1}
                        />
                    </div>
                </div>
                <TimePicker
                    className='timePicker'
                    onChange={this.setStartTime}
                    value={this.state.startTime}
                    />{` - `} 
                <TimePicker
                className='timePicker'
                    onChange={this.setEndTime}
                    value={this.state.endTime}
                    />
                    <select className='intervalSelect' onChange={(e) => this.setState({timeInterval: e.target.value})} name="" id="">
                        <option value={60}>1 hour intervals</option>
                        <option value={30}>30 minute intervals</option>
                        <option value={20}>20 minute intervals</option>
                        <option value={15}>15 minute intervals</option>
                        <option value={10}>10 minute intervals</option>
                        
                    </select>
                    <br/>
                    <input className='weekendsCheckbox' type="checkbox" 
                onChange={() => this.setState({includeWeekends: !this.state.includeWeekends})}
                /> Include Weekends <br />
                    <div className='timeSlotButtonsWrapper'>
                        <button className='timeSlotButton' onClick={this.props.modalToggle}>Cancel</button>
                        <button className='timeSlotButton' onClick={this.createTimeSlots}>Create Time Slots</button>
                    </div>
            </div>
        )
    }
}

export default AddTime