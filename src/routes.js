import {Route, Switch} from 'react-router-dom'
import React from 'react'

import Users from './components/Users/Users'
import Schedule from './components/Schedule/Schedule'

export default <Switch>
    <Route exact path='/' component={Schedule}/>
    <Route path='/users' component={Users}/>


</Switch>