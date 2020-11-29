import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addVideo } from "../../actions/profile";

const AddVideo = ({ addVideo, history }) => {
  const [formData, setFormData] = useState({
    videoLink: "",
    title: "",
  });

  const { videoLink, title } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className="large text-primary">Add Video</h1>

      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addVideo(formData, history);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Youtube URL"
            name="videoLink"
            value={videoLink}
            onChange={onChange}
            required
          />
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddVideo.propTypes = {
  addVideo: PropTypes.func.isRequired,
};

export default connect(null, { addVideo })(AddVideo);
