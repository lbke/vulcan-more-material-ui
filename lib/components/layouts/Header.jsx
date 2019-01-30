import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "mdi-material-ui/Menu";
import ChevronLeftIcon from "mdi-material-ui/ChevronLeft";
import withStyles from "@material-ui/core/styles/withStyles";
import withWidth from "@material-ui/core/withWidth";
import {
  getSetting,
  registerSetting,
  Components,
  registerComponent
} from "meteor/vulcan:core";
import classNames from "classnames";

registerSetting("layout.headerLogoUrl", undefined, "Small header logo url");

const drawerWidth = 240;
const topBarHeight = 100;
const styles = theme => {
  return {
    appBar: {
      position: "absolute",
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      color: "white",
      ...(theme.utils.appBarColor || {
        background: "linear-gradient(to left, #00d2ff, #3a7bd5)",
        backgroundColor: "#70e1f5"
      })
    },

    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    toolbar: {
      height: `${topBarHeight}px`,
      minHeight: `${topBarHeight}px`
    },
    headerMid: {
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      "& h1": {
        margin: "0 24px 0 0",
        fontSize: "18px",
        lineHeight: 1
      }
    },
    menuButton: {
      marginRight: theme.spacing.unit * 3
    },
    logo: {
      maxHeight: "64px",
      marginRight: theme.spacing.unit * 2
    }
  };
};

const Header = (
  {
    classes,
    isSideNavOpen,
    toggleSideNav,
    title = getSetting("title", "My App"),
    headerLogoUrl = getSetting("layout.headerLogoUrl"),
    headerRight,
    width
  },
  context
) => {
  return (
    <AppBar
      className={classNames(
        classes.appBar,
        isSideNavOpen && classes.appBarShift
      )}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          aria-label="open drawer"
          onClick={e => toggleSideNav()}
          className={classNames(classes.menuButton)}
          color="inherit"
          style={{
            marginRight: ["xs", "sm"].includes(width) ? 0 : undefined
          }}
        >
          {isSideNavOpen ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>

        <div className={classNames(classes.headerMid)}>
          {headerLogoUrl && (
            <img src={headerLogoUrl} className={classes.logo} />
          )}
          <Typography variant="title" color="inherit" className="tagline">
            {title}
          </Typography>
        </div>
        {headerRight && headerRight}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  isSideNavOpen: PropTypes.bool,
  toggleSideNav: PropTypes.func
};

Header.displayName = "Header";

registerComponent("Header", Header, [withStyles, styles], [withWidth]);
