import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";

import TimeSlot from "./TimeSlot";

class DisplayDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSlots: [],
      apptAddedToggle: false
    };
  }

  componentDidMount() {
    let date = encodeURI(this.props.date);
    axios.get(`/api/time/day?date=${date}`).then(res => {
      this.setState({
        timeSlots: res.data
      });
    });
  }
  componentDidUpdate(prevProps) {
    console.log("propstate", prevProps);
    if (
      this.props.updateToggle !== prevProps.updateToggle ||
      this.props.date !== prevProps.date
    ) {
      let date = encodeURI(this.props.date);
      axios.get(`/api/time/day?date=${date}`).then(res => {
        this.setState({
          timeSlots: res.data
        });
      });
    }
  }

  updateApptAddedToggle = () => {
    this.setState({ apptAddedToggle: !this.state.apptAddedToggle });
  };

  render() {
    let slotList = this.state.timeSlots.map(slot => {
      return (
        <TimeSlot
          key={slot.slot_id}
          user={this.props.user}
          admin={this.props.user.admin}
          slotId={slot.slot_id}
          date={slot.date}
          time={moment(slot.time_formatted, 'hh:mm A').format('h:mm A')}
          blocked={slot.blocked}
          userId={slot.user_id}
          apptId={slot.appt_id}
          taskId={slot.task_id}
          username={slot.user_name}
          apptAddedToggle={this.state.apptAddedToggle}
          updateApptAddedToggle={this.updateApptAddedToggle}
          updateHomeToggle={this.props.updateHomeToggle}
        />
      );
    });
    return (
      <div className="dayView">
        <h2 className='displayDateText'>{moment(this.props.date, "MM/DD/YY").format("dddd")}</h2>
        <h3 className='displayDateText'>{this.props.date}</h3>
        <div>{slotList}</div>
      </div>
    );
  }
}

function mapFromStateToProps({ user }) {
  return {
    user
  };
}

export default connect(
  mapFromStateToProps,
  {}
)(DisplayDay);
