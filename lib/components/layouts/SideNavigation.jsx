import React from "react";
import PropTypes from "prop-types";
import {
  Components,
  registerComponent,
  withCurrentUser
} from "meteor/vulcan:core";
import { browserHistory } from "react-router";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import ExpandLessIcon from "mdi-material-ui/ChevronUp";
import ExpandMoreIcon from "mdi-material-ui/ChevronDown";
import LockIcon from "mdi-material-ui/Lock";
import HomeIcon from "mdi-material-ui/Home";
import withStyles from "@material-ui/core/styles/withStyles";

import { getAuthorizedMenuItems, menuItemProps } from "meteor/vulcan:menu";
import { intlShape } from "meteor/vulcan:i18n";

const styles = theme => ({
  root: {},
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

const MenuItem = (
  { name, label, path, labelToken, LeftComponent, RightComponent },
  { intl }
) => (
  <ListItem key={name} button onClick={() => browserHistory.push(path)}>
    {LeftComponent && (
      <ListItemIcon>
        <LeftComponent />
      </ListItemIcon>
    )}
    <ListItemText primary={label || intl.formatMessage({ id: labelToken })} />
    {RightComponent && (
      <ListItemIcon>
        <RightComponent />
      </ListItemIcon>
    )}
  </ListItem>
);

MenuItem.propTypes = menuItemProps;

class SideNavigation extends React.Component {
  state = {
    isOpen: { admin: false }
  };

  toggle = item => {
    const newState = { isOpen: {} };
    newState.isOpen[item] = !this.state.isOpen[item];
    this.setState(newState);
  };

  render() {
    const { intl } = this.context;
    const currentUser = this.props.currentUser;
    const classes = this.props.classes;
    const isOpen = this.state.isOpen;
    const { adminMenuItems } = this.props;

    // ignores items the user can't see
    const basicMenuItems = getAuthorizedMenuItems();
    return (
      <div className={classes.root}>
        <List>
          <ListItem
            button
            onClick={() => {
              browserHistory.push("/");
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              inset
              primary={intl.formatMessage({ id: "layout.menu.home" })}
            />
          </ListItem>
        </List>
        {basicMenuItems.length > 0 && (
          <List>
            {basicMenuItems.map(props => (
              <MenuItem key={props.name} {...props} />
            ))}
          </List>
        )}

        {adminMenuItems &&
          adminMenuItems.length > 0 && (
            <div>
              <Divider />
              <List>
                <ListItem button onClick={e => this.toggle("admin")}>
                  <ListItemIcon>
                    <LockIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={intl.formatMessage({ id: "layout.menu.admin" })}
                  />
                  {isOpen.admin ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Collapse
                  in={isOpen.admin}
                  transitionduration="auto"
                  unmountOnExit
                >
                  {adminMenuItems.map(props => (
                    <MenuItem key={props.name} {...props} />
                  ))}
                </Collapse>
              </List>
            </div>
          )}
      </div>
    );
  }
}

SideNavigation.contextTypes = {
  intl: intlShape
};
MenuItem.contextTypes = {
  intl: intlShape
};
SideNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  adminMenuItems: PropTypes.array
};

SideNavigation.displayName = "SideNavigation";

registerComponent(
  "SideNavigation",
  SideNavigation,
  [withStyles, styles],
  withCurrentUser
);
