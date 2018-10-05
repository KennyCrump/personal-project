import React, {Component} from 'react'
import moment from 'moment'
import {connect} from 'react-redux'

import DisplayDay from './DisplayDay';
import AddTime from './AddTime'
import './Schedule.css'

class Schedule extends Component{
    constructor(props){
        super(props)
        this.state={
            dateRange : [],
            date: moment(), //default set to current week, changing weeks changes this date and date range is recalculated
            startOfWeek: '',
            endOfWeek: '',
            addSlotModalToggle: false,
            updateToggle: false
        }
    }

    componentDidMount(){
        let stateUpdates = this.createDateRange() //obj with state updates
        let {dateRange, date, startOfWeek, endOfWeek} = stateUpdates
       this.setState({dateRange, date, startOfWeek, endOfWeek})
    }

    createDateRange = (date = moment()) => {            //Takes in a date, defaulted to now, 
        var startOfWeek = moment(date).startOf('Week'); //and creates a date range from sunday 
        var endOfWeek = moment(date).endOf('Week');     //to saturday of that specific week
        var days = [];
        var day = startOfWeek;

        while (day <= endOfWeek) {
            days.push(day.toDate());
            day = day.clone().add(1, 'd');
        }

        let stateUpdates = {
            date: date.format("MM/DD/YY"),
            dateRange: days,
            startOfWeek: startOfWeek.format("MM/DD/YY"),
            endOfWeek: endOfWeek.format("MM/DD/YY")
        }
        return stateUpdates
    }
    moveWeek = (days) => {
        let newDay = this.state.date;
        newDay = moment(newDay).add(days, 'd')

        let stateUpdates = this.createDateRange(newDay) //Fn returns an object with all state updates
        let {dateRange, date, startOfWeek, endOfWeek} = stateUpdates
       this.setState({dateRange, date, startOfWeek, endOfWeek})
    }

    updateToggle = () => {
        this.setState({updateToggle: !this.state.updateToggle})
    }

    modalToggle = () =>{
        this.setState({
            addSlotModalToggle: !this.state.addSlotModalToggle
        })
    }

    render(){
        console.log(this.state)
        let weekView = this.state.dateRange.map((day, index) =>{
            return <DisplayDay 
            key={day}
            date={moment(day).format('MM/DD/YY')}
            updateToggle={this.state.updateToggle}/>
        })
        return(
            <div>
                <div className='weekViewPicker'>
                    <button className='arrowButtons' onClick={() => this.moveWeek(-7)}><h2>{'<<'}</h2></button>
                    <h2>{` ${this.state.startOfWeek} - ${this.state.endOfWeek} `}</h2>
                    <button className='arrowButtons' onClick={() => this.moveWeek(7)}><h2>{'>>'}</h2></button>
                </div>
                    {this.props.user.admin === 'admin' ?
                        <button className='addSlotsButton' onClick={this.modalToggle}>Add Time Slots</button>
                    :
                        null
                    }
                <div className='weekView'>
                    {weekView}
                </div>
                {this.state.addSlotModalToggle ?
                    <div className='addTimeModal'>
                        <AddTime
                            modalToggle={this.modalToggle}
                            updateToggle={this.updateToggle}
                        />
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

function mapFromStateToProps({user}){
    return{
        user
    }
}


export default connect(mapFromStateToProps, {})(Schedule)