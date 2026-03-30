import React from 'react'

const IdentityModal = ({ onClose, onSelect }) => {
  return (
    <div className="modal show fade d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Select Your Role</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body text-center">
            <button 
              className="btn btn-primary m-2"
              onClick={() => onSelect("stud")}
            >
              Student
            </button>

            <button 
              className="btn btn-success m-2"
              onClick={() => onSelect("recruit")}
            >
              Recruiter
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default IdentityModal