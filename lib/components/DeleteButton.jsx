import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "mdi-material-ui/Close";

const DeleteButton = () => {
  <IconButton variant="fab" color="primary">
    <CloseIcon />
  </IconButton>;
};
registerComponent({
  name: "DeleteButton",
  component: DeleteButton
});
