import {Route, Switch} from 'react-router-dom'
import React from 'react'

import Users from './components/Users/Users'
import Schedule from './components/Schedule/Schedule'
import Profile from './components/Profile/Profile'
import AdminHome from './components/Home/AdminHome'
import ClientHome from './components/Home/ClientHome'

export default <Switch>
    <Route exact path='/' component={ClientHome} />
    <Route path='/schedule' component={Schedule}/>
    <Route path='/admin/home' component={AdminHome} />
    <Route path='/users' component={Users}/>
    <Route path='/profile' component={Profile} />
    <Route path ='/user/:id' component={Profile} />

</Switch>