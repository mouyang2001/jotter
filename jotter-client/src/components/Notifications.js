import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";

import Menu from '@material-ui/core/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

import NotificationIcon from '@material-ui/icons/Notifications';
import FavouriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

import { useDispatch, useSelector } from 'react-redux';
import '../redux/actions/userActions';
import userActions from '../redux/actions/userActions';

export default function Notifications() {

  const dispatch = useDispatch();

  dayjs.extend(relativeTime);

  const notifications = useSelector((state) => state.user.notifications);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuOpened = () => {
    let unreadNotificationsIds = notifications
      .filter(not => !not.read)
      .map(not => not.notificationId);
    
    dispatch(userActions.markNotificationsRead(unreadNotificationsIds));
  }

  let notificationIcon;
  if (notifications && notifications.length > 0) {
    notifications.filter(not => not.read === false).length > 0
      ? notificationIcon = (
          <Badge badgeContent={notifications.filter(not => not.read === false).length} color='secondary'>
            <NotificationIcon/>
          </Badge>
      ) : (
        notificationIcon = <NotificationIcon/>
      )
  } else {
    notificationIcon = <NotificationIcon />;
  }

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map(not => {
        const verb = not.type === 'like' ? 'liked' : 'commented on';
        const time = dayjs(not.createdAt).fromNow();
        const iconColor = not.read ? 'primary' : 'secondary';
        const icon = not.type === 'like' ? (
          <FavouriteIcon color={iconColor} style={{marginRight: 10}}/>
        ) : (
          <ChatIcon color={iconColor} style={{marginRight: 10}}/>
        ) 

        return (
          <MenuItem key={not.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              color="default"
              variant="body1"
              to={`/users/${not.recipient}/note/${not.noteId}`}>
                {not.sender} {verb} your note {time}
            </Typography>
          </MenuItem>
        )
      })
    ) : (
      <MenuItem onClick={handleClose}>
        You have no notifications
      </MenuItem>
    );

  return (
    <Fragment>
      <Tooltip placement="top" title="Notifications">
        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          {notificationIcon}
        </IconButton>
      </Tooltip>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </Fragment>
  )
}
