import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i class="fas fa-podcast"></i> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i class="fas fa-guitar"></i> Add Experience
      </Link>
      <Link to="/add-audio" className="btn btn-light">
        <i class="fa fa-music" aria-hidden="true"></i> Add Audio
      </Link>
      <Link to="/add-video" className="btn btn-light">
        <i class="far fa-play-circle"></i> Add Video
      </Link>
    </div>
  );
};

export default DashboardActions;
