import React, {Component} from 'react'
import moment from 'moment'

class Schedule extends Component{
    constructor(props){
        super(props)
        this.state={
            dateRange : [],
            date: moment(),
            startOfWeek: '',
            endOfWeek: ''
        }
    }

    componentDidMount(){
        // let startOfWeek = moment().startOf('Week') 
        // let endOfWeek = moment().endOf('Week') 
        // let days = []
        // let day = startOfWeek

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
    }

    render(){
        console.log(this.state)
        return(
            <div>
                Hello
                <button onClick={() => this.moveWeek(-7)}>Last Week</button>
                <button onClick={() => this.moveWeek(7)}>Next Week</button>
            </div>
        )
    }
}

export default Schedule