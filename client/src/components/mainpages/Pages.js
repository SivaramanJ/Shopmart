import React from 'react'
import { Switch, Route } from 'react-router'
import Products from './products/Products'
import Login from './auth/Login'
import Register from './auth/Register'
import Notfound from './utils/not_found/Notfound'


export default function Pages() {
    return (
        <Switch>
            <Route path="/" exact component={Products}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>

            <Route path="*" exact component={Notfound}/>
        </Switch>
    )
}
