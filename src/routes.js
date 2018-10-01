import {Route, Switch} from 'react-router-dom'
import React from 'react'

import Users from './components/Users/Users'
import Schedule from './components/Schedule/Schedule'
import Profile from './components/Profile/Profile'
import AdminHome from './components/Home/AdminHome'

export default <Switch>
    <Route exact path='/' component={Schedule}/>
    <Route path='/admin/home' component={AdminHome} />
    <Route path='/users' component={Users}/>
    <Route path ='/user/:id' component={Profile} />

</Switch>