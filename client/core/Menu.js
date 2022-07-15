var React = require('react')
var AppBar = require('@material-ui/core/AppBar')
var Toolbar = require('@material-ui/core/Toolbar')
var Typography = require('@material-ui/core/Typography')
var IconButton = require('@material-ui/core/IconButton')
var HomeIcon = require('@material-ui/icons/Home')
var Button = require('@material-ui/core/Button')
var auth = require('./../auth/auth-helper')
var { Link } = require('react-router-dom')
var { withRouter }  = require('react-router-dom')

const isActive = (history, path) => {
  if (history.location.pathname == path)
    return {color: '#ffa726'}
  else
    return {color: '#ffffff'}
}
const Menu = () => withRouter(
  ({history}) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        MERN Social
      </Typography>
      <Link to="/">
        <IconButton aria-label="Home" style={isActive(history, "/")}>
          <HomeIcon/>
        </IconButton>
      </Link>
      {
        !auth.isAuthenticated() && (<span>
          <Link to="/signup">
            <Button style={isActive(history, "/signup")}>Sign up
            </Button>
          </Link>
          <Link to="/signin">
            <Button style={isActive(history, "/signin")}>Sign In
            </Button>
          </Link>
        </span>)
      }
      {
        auth.isAuthenticated() && (<span>
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
          </Link>
          <Button color="inherit" onClick={() => {
              auth.clearJWT(() => history.push('/'))
            }}>Sign out</Button>
        </span>)
      }
    </Toolbar>
  </AppBar>
))

export default Menu
module.exports = Menu;
