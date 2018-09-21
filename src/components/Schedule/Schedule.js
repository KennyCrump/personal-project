import React, {Component} from 'react'
import moment from 'moment'
import DisplayDay from './DisplayDay';

class Schedule extends Component{
    constructor(props){
        super(props)
        this.state={
            dateRange : [],
            date: moment(), //default set to current week, changing weeks changes this date and date range is recalculated
            startOfWeek: '',
            endOfWeek: ''
        }
    }

    componentDidMount(){
       this.createDateRange()
    }
    createDateRange = () => {
        var startOfWeek = moment(this.state.date).startOf('Week');
        var endOfWeek = moment(this.state.date).endOf('Week');
        var days = [];
        var day = startOfWeek;

        while (day <= endOfWeek) {
            days.push(day.toDate());
            day = day.clone().add(1, 'd');
        }

        this.setState({
            dateRange: days,
            startOfWeek: startOfWeek.format("MM/DD/YY"),
            endOfWeek: endOfWeek.format("MM/DD/YY")
        })
    }
    moveWeek = (days) => {
        let newDay = this.state.date;
        newDay = moment(newDay).add(days, 'd')
        this.setState({
            date: newDay
        })
        this.createDateRange()
        this.forceUpdate()
    }

    render(){
        console.log(this.state)
        let weekView = this.state.dateRange.map((day, index) =>{
            // console.log(moment(day).format('MM/DD/YY'))
            return <DisplayDay 
            key={day}
            date={moment(day).format('MM/DD/YY')}/>
        })
        return(
            <div>
                Hello
                <div className='weekView'></div>
                {weekView}
                <button onClick={() => this.moveWeek(-7)}>Last Week</button>
                {this.state.startOfWeek} - {this.state.endOfWeek}
                <button onClick={() => this.moveWeek(7)}>Next Week</button>
            </div>
        )
    }
}

export default Schedule