module.exports = {
    addTimeSlot: (req, res) => {
        const db = req.app.get('db')
        let {date, time} = req.body
        db.add_time_slot({date, time}).then(response => {
            res.status(200).send(console.log('Slot Added'))
        })
    }
}