import { Components } from "meteor/vulcan:core";
import { FormattedMessage } from "meteor/vulcan:i18n";
import Button from "@material-ui/core/Button";

export const withDeleteModal = ({
  collection,
  DeleteModalContent = DefaultDeleteModalContent
}) => C => (deleteProps = {}, otherProps) => {
  return collection.options.mutations.delete.check(currentUser, document) ? (
    <Components.ModalTrigger size="small" component={<C {...otherProps} />}>
      <DeleteModalContent
        collection={collection}
        document={document}
        {...deleteProps}
      />
    </Components.ModalTrigger>
  ) : (
    <C canDelete={false} {...otherProps} />
  );
};

const DefaultDeleteModalContent = ({
  collection,
  closeModal,
  document,
  ...otherProps
}) => {
  return (
    <div style={{ textAlign: "center" }}>
      <Button
        onClick={() => {
          otherProps["delete" + collection.options.typeName]({
            selector: { _id: document._id }
          });
          closeModal();
        }}
      >
        <FormattedMessage id="components.defaultDeleteModal.confirm" />
      </Button>
    </div>
  );
};

export default withDeleteModal;
