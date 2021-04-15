import React from "react";
import { Button, Modal, ModalBody } from "reactstrap";

const DeleteModal = ({ isOpen, setOpenDeleteModal,handleDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={() => setOpenDeleteModal(false)}
      className="delete__modal"
    >
      <ModalBody className="p-3">
        <div className="row">
          <div className="col-sm-12 text-center">
            <h4>Do You really want to delete this person .?</h4> <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 text-center">
            <Button color="primary" onClick={handleDelete} >Yes</Button>
            <Button color="info" onClick={() => setOpenDeleteModal(false)} style={{ marginLeft: "30px" }}>No</Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteModal;
