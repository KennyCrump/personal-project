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
        db.get_day({date}).then(timeSlots => {
            res.status(200).send(timeSlots)
        }).catch( err => {
            res.status(500).send(err)
        })
    },
    addAppt: (req, res) => {
        const db = req.app.get('db')
        let {user_id, slot_id, summary} = req.body
        db.create_appt({user_id, slot_id, summary}).then(resolve => {
            res.status(200).send(resolve)
        })
    },
    updateAppt: (req, res) => {
        const db = req.app.get('db')
        let {appt_id} = req.params
        let {summary, notes, total} = req.body
        db.update_appt({appt_id, summary, notes, total}).then(resolve => {
            res.status(200).send(console.log('appt updated in DB'))
        })
    }

}