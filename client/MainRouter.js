var React = require('react')
var { Component } = require('react')
var { Route } = require('react-router-dom')
var { Switch } = require('react-router-dom')
var Home  = require('./core/Home')
var Users = require('./user/Users')
var Signup = require('./user/Signup')
var Signin = require('./auth/Signin')
var EditProfile = require('./user/EditProfile')
var Profile = require('./user/Profile')
var PrivateRoute = require('./auth/PrivateRoute')

var Menu = require('./core/Menu')


const MainRouter = () => {
    return (
      <div>
        <Menu/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/users" component={Users}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/signin" component={Signin}/>
          <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
          <Route path="/user/:userId" component={Profile}/>
        </Switch>
      </div>)
}

export default MainRouter
