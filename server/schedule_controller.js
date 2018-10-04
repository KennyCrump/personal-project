module.exports = {
    addTimeSlot: (req, res) => {
        const db = req.app.get('db')
        let {date, time} = req.body
        db.find_time_slot({date, time}).then(response => {
            if(!response[0]){
                db.add_time_slot({date, time}).then(resolve => {
                    res.status(200).send(console.log('Slot Added'))
                })
            }else{
                res.status(200).send(console.log('slot already exists'))
            }
        })
    },
    getDay: (req, res) => {
        const db = req.app.get('db')
        let {date} = req.query
        date = decodeURI(date)
        console.log(date)
        if(req.session.user.admin === 'admin'){
            db.get_day_admin({date}).then(timeSlots => {
                res.status(200).send(timeSlots)
            }).catch( err => {
                res.status(500).send(err)
            })
        }else{
            db.get_day_admin({date}).then(timeSlots => {
                res.status(200).send(timeSlots)
            }).catch( err => {
                res.status(500).send(err)
            })
        }
    },
    addAppt: (req, res) => {
        const db = req.app.get('db')
        let {user_id, slot_id, summary, notes} = req.body
        db.create_appt({user_id, slot_id, summary, notes}).then(appt => {
            res.status(200).send(appt)
        })
    },
    updateAppt: (req, res) => {
        const db = req.app.get('db')
        let {appt_id} = req.params
        let {summary, notes, total} = req.body
        db.update_appt({appt_id, summary, notes, total}).then(() => {
            res.status(200).send(console.log('appt updated in DB'))
        })
    },
    getApptsForDay: (req, res) => {
        const db = req.app.get('db')
        let {date} = req.query
        date = decodeURI(date)
        db.get_appts_for_day({date}).then(appts => {
            res.status(200).send(appts)
        })
    },
    deleteAppt: (req, res) => {
        const db = req.app.get('db')
        const {appt_id} = req.params
        db.delete_appt({appt_id}).then(()=> {
            res.status(200).send(console.log('appt deleted from DB'))
        })
    }
}