import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Components, replaceComponent } from "meteor/vulcan:core";

class FormNestedObject extends PureComponent {
  render() {
    const FormComponents = this.props.formComponents;
    //const value = this.getCurrentValue()
    // do not pass FormNested's own value, input and inputProperties props down
    const properties = _.omit(
      this.props,
      "value",
      "input",
      "inputProperties",
      "nestedInput"
    );
    const { errors } = this.props;
    // only keep errors specific to the nested array (and not its subfields)
    const nestedObjectErrors = errors.filter(
      error => error.path && error.path === this.props.path
    );
    const hasErrors = nestedObjectErrors && nestedObjectErrors.length;
    return (
      <Grid
        container
        className={`form-group row form-nested ${
          hasErrors ? "input-error" : ""
        }`}
      >
        <Grid item xs={3} md={2}>
          <Typography component="label">{this.props.label}</Typography>
        </Grid>
        <Grid item xs={9} md={10}>
          <FormComponents.FormNestedItem
            {...properties}
            path={`${this.props.path}`}
          />
          {hasErrors ? (
            <FormComponents.FieldErrors errors={nestedObjectErrors} />
          ) : null}
        </Grid>
      </Grid>
    );
  }
}

FormNestedObject.propTypes = {
  currentValues: PropTypes.object,
  path: PropTypes.string,
  label: PropTypes.string,
  errors: PropTypes.array.isRequired
};

module.exports = FormNestedObject;

replaceComponent("FormNestedObject", FormNestedObject);
