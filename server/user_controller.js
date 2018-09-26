module.exports ={
    getAllUsers: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.get_all_users().then(users => {
            res.status(200).send(users)
        })
    },
    getUserProfile: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.get_user_profile({user_id: id}).then(user => {
            res.status(200).send(user)
        })
    }
    // getProfile: (req, res) => {
    //     const db = req.app.get('db')
    //     const {id}
    // }
}