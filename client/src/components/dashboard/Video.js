import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteVideo } from "../../actions/profile";

const Video = ({ video, deleteVideo }) => {
  const videos = video.map((video) => (
    <tr key={video._id}>
      <td>{video.title}</td>

      <td>
        <button
          onClick={() => deleteVideo(video._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Videos</h2>
      <table className="table">
        <tbody>{videos}</tbody>
      </table>
    </Fragment>
  );
};

Video.propTypes = {
  video: PropTypes.array.isRequired,
  deleteVideo: PropTypes.func.isRequired,
};

export default connect(null, { deleteVideo })(Video);
