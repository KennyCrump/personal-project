require('dotenv').config()
const axios = require('axios')
const {
    SERVER_PORT,
    SESSION_SECRET,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    CONNECTION_STRING,
    ENVIRONMENT
  } = process.env;

module.exports = {
   login: async (req, res) => {
        let payload = {
          client_id: REACT_APP_CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code: req.query.code,
          grant_type: 'authorization_code',
          redirect_uri: `http://${req.headers.host}/auth/callback`
        }
        // post request with code for token
        let tokenRes = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload);
        // use token to get user data
        let userRes = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${tokenRes.data.access_token}`)
      
        const db = req.app.get('db');
        const { email, name, picture, sub } = userRes.data;
      
        let foundUser = await db.find_user([sub])
        if (foundUser[0]) {
          req.session.user = foundUser[0];
          // console.log(req.session.user.admin)
        } else {
          let createdUser = await db.create_user([name, email, picture, sub]);
          // [ {name, email, picture, auth_id} ]
          req.session.user = createdUser[0]
        }
        if(req.session.user.admin === 'admin'){
          res.redirect('/#/admin/home')
        }else{
          res.redirect('/')
        }
    },
    logout: (req, res) => {
      req.session.destroy();
      console.log('SessionDestroyed')
    }
}