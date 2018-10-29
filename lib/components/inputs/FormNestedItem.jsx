import React from "react";
import PropTypes from "prop-types";
import { Components, replaceComponent } from "meteor/vulcan:core";
import MinusIcon from "mdi-material-ui/Minus";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  buttonWrapper: {
    marginBottom: theme.spacing.unit * 2
  },
  wrapper: {
    paddingLeft: theme.spacing.unit * 2,
    borderLeft: "4px solid #eeeeee"
  }
});

const FormNestedItem = (
  { field, name, path, removeItem, itemIndex, classes, nestedFields, ...props },
  { errors }
) => {
  const isArray = typeof itemIndex !== "undefined";
  return (
    <Grid container className={classes.wrapper} alignItems="center">
      <Grid className={classes.inputWrapper} item style={{ flexGrow: 1 }}>
        {nestedFields ? (
          nestedFields.map(nestedField => (
            <Components.FormComponent
              key={nestedField.path}
              {...props}
              {...nestedField || {}}
              path={`${path}.${nestedField.name}`}
              itemIndex={itemIndex}
            />
          ))
        ) : (
          <Components.FormComponent
            key={name}
            {...props}
            {...field || {}}
            name={name}
            path={path}
            itemIndex={itemIndex}
            hideLabel={true}
          />
        )}
      </Grid>
      {isArray &&
        removeItem && (
          <Grid item key="remove-button" className={classes.buttonWrapper}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                removeItem(name);
              }}
            >
              <MinusIcon />
            </Button>
          </Grid>
        )}
    </Grid>
  );
};

FormNestedItem.propTypes = {
  path: PropTypes.string.isRequired,
  itemIndex: PropTypes.number
};

FormNestedItem.contextTypes = {
  errors: PropTypes.array
};

export default FormNestedItem;

replaceComponent({
  name: "FormNestedItem",
  component: FormNestedItem,
  hocs: [[withStyles, styles]]
});
