const React, {useState} =require('react');
const PropTypes =require('prop-types');
const IconButton =require('@material-ui/core/IconButton');
const Button =require('@material-ui/core/Button');
const DeleteIcon =require('@material-ui/icons/Delete');
const Dialog =require('@material-ui/core/Dialog');
const DialogActions =require('@material-ui/core/DialogActions');
const DialogContent =require('@material-ui/core/DialogContent');
const DialogContentText =require('@material-ui/core/DialogContentText');
const DialogTitle =require('@material-ui/core/DialogTitle');
const auth =require('./../auth/auth-helper');
const {remove} =require('./api-user.js');
const {Redirect, Link} =require('react-router-dom');

export default function DeleteUser(props) {
  const [open, setOpen] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const jwt = auth.isAuthenticated()
  const clickButton = () => {
    setOpen(true)
  }
  const deleteAccount = () => {
    remove({
      userId: props.userId
    }, {t: jwt.token}).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        auth.clearJWT(() => console.log('deleted'))
        setRedirect(true)
      }
    })
  }
  const handleRequestClose = () => {
    setOpen(false)
  }

    if (redirect) {
      return <Redirect to='/'/>
    }
    return (<span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon/>
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteAccount} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>)
}
DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired
}

};
