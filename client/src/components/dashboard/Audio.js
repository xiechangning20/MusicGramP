import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAudio } from "../../actions/profile";

const Audio = ({ audio, deleteAudio }) => {
  const audios = audio.map((audio) => (
    <tr key={audio._id}>
      <td>{audio.title}</td>

      <td>
        <button
          onClick={() => deleteAudio(audio.fileId)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Audios</h2>
      <table className="table">
        <tbody>{audios}</tbody>
      </table>
    </Fragment>
  );
};

Audio.propTypes = {
  audio: PropTypes.array.isRequired,
  deleteAudio: PropTypes.func.isRequired,
};

export default connect(null, { deleteAudio })(Audio);
