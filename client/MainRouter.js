const React = require('react');
const { Component } = require('react');
const { Route } = require('react-router-dom');
const { Switch } = require('react-router-dom');
const Home  = require('./core/Home');
const Users = require('./user/Users');
const Signup = require('./user/Signup');
const Signin = require('./auth/Signin');
const EditProfile = require('./user/EditProfile');
const Profile = require('./user/Profile');
const PrivateRoute = require('./auth/PrivateRoute');

const Menu = require('./core/Menu')


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

export default MainRouter;
