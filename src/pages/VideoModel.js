// VideoModal.js
import React from 'react';
import PropTypes from 'prop-types';

const VideoModal = ({ show, handleClose, videoUrl }) => {
  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }} aria-labelledby="videoModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="videoModalLabel">Video</h5>
            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {videoUrl && (
              <video width="100%" controls>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

VideoModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  videoUrl: PropTypes.string
};

export default VideoModal;
