const React =require('react');
const PropTypes =require('prop-types');
const Button =require('@material-ui/core/Button');
const { unfollow, follow } =require('./api-user.js');

export default function FollowProfileButton (props) {
  const followClick = () => {
    props.onButtonClick(follow)
  }
  const unfollowClick = () => {
    props.onButtonClick(unfollow)
  }
    return (<div>
      { props.following
        ? (<Button variant="contained" color="secondary" onClick={unfollowClick}>Unfollow</Button>)
        : (<Button variant="contained" color="primary" onClick={followClick}>Follow</Button>)
      }
    </div>)
}
FollowProfileButton.propTypes = {
  following: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired
}

// module.exports = {FollowProfileButton};
