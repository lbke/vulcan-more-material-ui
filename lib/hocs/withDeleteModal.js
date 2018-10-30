import React from "react";
import PropTypes from "prop-types";
import {
  Components,
  registerComponent,
  getComponent
} from "meteor/vulcan:core";
import { withDelete, withCurrentUser } from "meteor/vulcan:core";
import { FormattedMessage } from "meteor/vulcan:i18n";
import Button from "@material-ui/core/Button";
import { getDeleteMutationName } from "meteor/vulcan:more-helpers";

export const withDeleteModal = ({
  collection,
  DeleteModalContent = DefaultDeleteModalContent
}) => C => {
  const Wrapped = ({
    deleteProps = {},
    closeModal,
    document,
    currentUser,
    ...otherProps
  }) => {
    // the inner button
    const Inner = innerProps => (
      <C
        document={document}
        closeModal={closeModal}
        {...otherProps}
        {...innerProps}
      />
    );
    return collection.options.mutations.delete.check(currentUser, document) ? (
      <Components.ModalTrigger
        size="small"
        component={<Inner canDelete={true} />}
      >
        <DeleteModalContent
          collection={collection}
          documentId={document._id}
          closeModal={closeModal}
          // delete function is smth like "deleteRecipe"
          deleteMutation={otherProps[getDeleteMutationName(collection)]}
          {...deleteProps}
        />
      </Components.ModalTrigger>
    ) : (
      <Inner canDelete={false} />
    );
  };
  const componentName = `withDeleteModal(${C.displayName})`;
  Wrapped.displayName = componentName;
  // delay hocs
  registerComponent({
    name: componentName,
    component: Wrapped,
    hocs: [withCurrentUser, [withDelete, { collection }]]
  });
  return getComponent(componentName);
};

// the modal content
const DefaultDeleteModalContent = ({
  closeModal,
  documentId,
  deleteMutation,
  ...otherProps
}) => {
  return (
    <div style={{ textAlign: "center" }}>
      <Button
        onClick={() => {
          deleteMutation({
            selector: { _id: documentId }
          });
          closeModal();
        }}
      >
        <FormattedMessage id="components.defaultDeleteModal.confirm" />
      </Button>
    </div>
  );
};
DefaultDeleteModalContent.propTypes = {
  closeModal: PropTypes.func,
  deleteMutation: PropTypes.func.isRequired,
  documentId: PropTypes.string.isRequired,
  collection: PropTypes.object
};

export default withDeleteModal;
