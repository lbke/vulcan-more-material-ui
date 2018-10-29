import React from "react";
import {
  Components,
  registerComponent,
  withCurrentUser
} from "meteor/vulcan:core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import LoginIcon from "mdi-material-ui/Login";
import LogoutIcon from "mdi-material-ui/Logout";
import { Accounts } from "meteor/vulcan:accounts";
import { FormattedMessage } from "meteor/vulcan:i18n";

const TextUserIndicator = ({ currentUser }) =>
  !currentUser ? (
    <Button color="inherit" href="/">
      <FormattedMessage id={"layout.user.signin"} />
    </Button>
  ) : (
    <Button
      color="inherit"
      onClick={() => {
        // TODO: develop a signout method
        Accounts.logout(Accounts.ui._options.onSignedOutHook);
      }}
    >
      <FormattedMessage id={"layout.user.signout"} />
    </Button>
  );
registerComponent({
  name: "TextUserIndicator",
  component: TextUserIndicator,
  hocs: [withCurrentUser]
});
const IconUserIndicator = ({ currentUser }) =>
  !currentUser ? (
    <IconButton href="/" title="Sign in" variant="fab" color="secondary">
      <LoginIcon style={{ fontSize: "32px" }} />
    </IconButton>
  ) : (
    <IconButton
      onClick={() => {
        // TODO: develop a signout method
        Accounts.logout(Accounts.ui._options.onSignedOutHook);
      }}
      title="Sign out"
      variant="fab"
      color="secondary"
    >
      <LogoutIcon style={{ fontSize: "32px" }} />
    </IconButton>
  );
registerComponent({
  name: "IconUserIndicator",
  component: IconUserIndicator,
  hocs: [withCurrentUser]
});
const ResponsiveUserIndicator = ({ currentUser, router }) => (
  <React.Fragment>
    <Hidden smDown>
      <Components.TextUserIndicator />
    </Hidden>
    <Hidden smUp>
      <Components.IconUserIndicator />
    </Hidden>
  </React.Fragment>
);

registerComponent({
  name: "UserIndicator",
  component: ResponsiveUserIndicator
});

export default ResponsiveUserIndicator;
