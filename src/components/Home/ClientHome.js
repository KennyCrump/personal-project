import React, { Component } from "react";
import Slider from "react-slick";
import adminVideo from "./AppointHub-Admin.mp4";
import schedule from "./schedule.png";
import adminHome from "./adminHome.png";
import addAppt from "./addAppt.png";
import editAppt from "./editAppt.png";
import userProfile from "./userProfile.png";

class ClientHome extends Component {
  // constructor(props){
  //     super(props)

  // }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    console.log(this.props)
    return (
      <div className="clientHomeWrapper">
        <h1>Welcome To AppointHub</h1>
        <h3>Browse the media carousel for an idea of how the site works</h3>
        <h3>Or Login to look around and make an appointment</h3>
        <Slider {...settings}>
          <div>
            <h3>Video Walkthrough</h3>
            <div className="homeImageWrapper">
            <iframe
              src={adminVideo}
              style={{ height: "600px", width: "900px" }}
              frameborder="0"
            />
            <p className="description">
              Most of the site functionality is from an Admin View, so here is a
              brief example of what the site is capable of.
            </p>
            </div>
          </div>
          <div>
            <h3>Schedule</h3>
            <div className="homeImageWrapper">
              <img className="homeImages" src={schedule} alt="schedule-view" />
              <p className="description">
                View your schedule on a weekly basis in an easy-to-manage
                organization. Add appointments directly from here, or go to the
                individual day view for a more in-depth view.
              </p>
            </div>
          </div>
          <div>
            <h3>Admin Day View</h3>
            <div className="homeImageWrapper">
              <img className="homeImages" src={adminHome} alt="admin-home" />
              <p className="description">
                Can access each client's profile on that day's schedule, as well
                as directly access the appointment information for these clients
                to view and edit.
              </p>
            </div>
          </div>
          <div>
            <h3>Adding Appointments</h3>
            <div className="homeImageWrapper">
              <img className="homeImages" src={addAppt} alt="add-appt" />
              <p className="description">
                Can filter users, select or change the desired user, add Summary
                and Notes and save the appointment directly to your schedule.
              </p>
            </div>
          </div>
          <div>
            <h3>Update Appointment Information</h3>
            <div className="homeImageWrapper">
              <img
                className="homeImages"
                src={editAppt}
                alt="edit-appointment"
              />
              <p className="description">
                Ability to search for specific users or find in the list, view
                upcoming and past appointments, reschedule/cancel upcoming
                appointments, and edit. Client View is very similar but removes
                the list with only the ability to view their personal profile,
                as well as removing the ability to edit appointment info.
              </p>
            </div>
          </div>
          <div>
            <h3>User Profile</h3>
            <div className="homeImageWrapper">
              <img
                className="homeImages"
                src={userProfile}
                alt="user-Profile"
              />
              <p className="description">
                This appointment view is available from profile pages for each
                individual appointment, as well as from the admin home page
                where you can edit that day's appointments without redirecting
                to the user's profile. Client's can view, but can't edit their
                appointments other than rescheduling/canceling upcoming
                appointments.
              </p>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}

export default ClientHome;
