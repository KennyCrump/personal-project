import React, {Component} from 'react'

class Appointment extends Component{
    constructor(props){
        super(props)
        this.state ={
            summary: '',
            notes: '',
            total: '',
            editToggle: false
        }
    }
    
    componentDidMount(){
        let {apptID, slotId, summary, date, time, notes, username, userId, total} = this.props
        this.setState({summary, notes, total})
    }

    handleEditToggle = () => {
        this.setState({editToggle: !this.state.editToggle})
    }

    render(){
        let {apptID, slotId, date, time, username, userId} = this.props
        let {summary, notes, total, editToggle} = this.state
        return(
            <div>  
                <div>   
                    <hr/>
                    <p>Date: {date}</p>
                    <p>Time: {time}</p>
                    {editToggle ?
                        <div>
                            <input type="text" 
                                value={summary} 
                                onChange={e => this.setState({summary: e.target.value})}/>
                                <br/>
                            <input type="text"
                                value={notes}
                                onChange={e => this.setState({notes: e.target.value})}/>
                        </div>
                        :
                        <div>
                            <p>Summary: {summary}</p>
                            <p>Notes: {notes}</p>
                        </div>
                    }
                    <button onClick={this.handleEditToggle}>
                    {editToggle ? 
                        'Save'
                        :
                        'Edit'
                    }
                    </button>
                    <hr/>
                </div>
                
            </div>
        )
    }
}

export default Appointment