module.exports ={
    getAllUsers: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.get_all_users().then(users => {
            res.status(200).send(users)
        })
    },
    getUser: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.get_user({user_id: id}).then(user => {
            res.status(200).send(user)
        })
    }
}