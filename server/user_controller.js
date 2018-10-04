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
    },
    getUsersForDay: (req, res) => {
        const db = req.app.get('db')
        let {date} = req.query
        date = decodeURI(date)
        db.get_users_for_day({date}).then(users => {
            res.status(200).send(users)
        }).catch(err => res.status(500).send(err))
    },
    getUserData: (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session.user)
        }else{
            res.status(401).send('Go login')
        }
    }
    // getProfile: (req, res) => {
    //     const db = req.app.get('db')
    //     const {id}
    // }
}