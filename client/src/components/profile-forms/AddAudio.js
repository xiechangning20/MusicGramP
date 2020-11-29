import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTrack } from "../../actions/profile";

const AddAudio = ({ addTrack, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    fileId: "",
  });

  let trackForm = new FormData();

  const { title, fileId } = formData;

  // const onChange = e =>
  //   setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className="large text-primary">Add Your Track</h1>

      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          trackForm.append("name", title);
          addTrack(trackForm, formData, history);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) =>
              setFormData({ ...FormData, title: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <input
            type="file"
            placeholder="Upload your Track"
            name="file"
            onChange={(e) => {
              trackForm.append("track", e.target.files[0]);
            }}
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

AddAudio.propTypes = {
  addTrack: PropTypes.func.isRequired,
};

export default connect(null, { addTrack })(AddAudio);
