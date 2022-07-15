const React, {useState, useEffect} =require('react');
const { makeStyles } =require('@material-ui/core/styles');
const Paper =require('@material-ui/core/Paper');
const List =require('@material-ui/core/List');
const ListItem =require('@material-ui/core/ListItem');
const ListItemAvatar =require('@material-ui/core/ListItemAvatar');
const ListItemSecondaryAction =require('@material-ui/core/ListItemSecondaryAction');
const ListItemText =require('@material-ui/core/ListItemText');
const Avatar =require('@material-ui/core/Avatar');
const IconButton =require('@material-ui/core/IconButton');
const Typography =require('@material-ui/core/Typography');
const ArrowForward =require('@material-ui/icons/ArrowForward');
const Person =require('@material-ui/icons/Person');
const {Link} =require('react-router-dom');
const {list} =require('./api-user.js');

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  }
}));

export default function Users() {
  const classes = useStyles()
  const [users, setUsers] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setUsers(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }
  }, [])


    return (
      <Paper className={classes.root} elevation={4}>
        <Typography variant="h6" className={classes.title}>
          All Users
        </Typography>
        <List dense>
         {users.map((item, i) => {
          return <Link to={"/user/" + item._id} key={i}>
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar>
                          <Person/>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.name}/>
                      <ListItemSecondaryAction>
                      <IconButton>
                          <ArrowForward/>
                      </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                 </Link>
               })
             }
        </List>
      </Paper>
    )
}

// module.exports = {Users};
