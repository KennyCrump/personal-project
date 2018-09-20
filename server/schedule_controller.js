module.exports = {
    addTimeSlot: (req, res) => {
        const db = req.app.get('db')
        let {date, time} = req.body
        db.add_time_slot({date, time}).then(response => {
            res.status(200).send(console.log('Slot Added'))
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
    }
}