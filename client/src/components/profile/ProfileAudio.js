import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { playAudio } from "../../actions/profile";

const ProfileAudio = ({ audio, playAudio }) => (
  <div id="music-container">
    <table>
      <tbody>
        <tr>
          <th>{audio.title}</th>
          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
          <th>
            <button
              id={`btn${audio.fileId}`}
              onClick={() => playAudio(audio.fileId)}
              className="btn btn-dark"
            >
              <i class="fas fa-play"></i>
            </button>
            <audio id={`${audio.fileId}`} src={`/api/upload/${audio.fileId}`} />
          </th>
        </tr>
      </tbody>
    </table>
  </div>
);

ProfileAudio.propTypes = {
  audio: PropTypes.object.isRequired,
  playAudio: PropTypes.func.isRequired,
};

export default connect(null, { playAudio })(ProfileAudio);
