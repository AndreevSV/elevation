function ModalWindow({ open, onClose, onDelete }: { open: boolean, onClose: () => void, onDelete: () => void }) {
  if (!open) {
    return null;
  }

  return (
    <div className="modal" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Deletion confirmation</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>
              If you want to delete, please click the Delete button, otherwise
              click Close
            </p>
          </div>
          <div className="modal-footer">
            <button type="button" 
            className="btn btn-danger"
            onClick={onDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalWindow;
