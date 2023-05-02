export const DeleteDialog = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null
  }
  return (
    <div className='dialog'>
      <div className="dialog__content">
        <p className="dialog__text">Are you sure you want to delete this deck?</p>
        <div className="dialog__buttons">
          <button onClick={onCancel} className="btn ">No</button>
          <button onClick={onConfirm} className="btn btn--danger">Sure</button>
        </div>
      </div>
    </div>
  )
}