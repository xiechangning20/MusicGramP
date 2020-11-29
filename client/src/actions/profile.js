import api from "../utils/api";
import { setAlert } from "./alert";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_REPOS,
  NO_REPOS,
} from "./types";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get("/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await api.get("/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const res = await api.post("/profile", formData);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const res = await api.put("/profile/experience", formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Track
export const addTrack = (trackForm, formData, history) => async (dispatch) => {

  try {
    const res = await api.post("/upload", trackForm, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    formData.fileId = res.data.message;
    const resProfile = await api.put("profile/audio", formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: resProfile.data,
    });

    dispatch(setAlert("Audio Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add Video
export const addVideo = (formData, history) => async (dispatch) => {
  try {
    console.log(formData);
    const res = await api.put("/profile/video", formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Video Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Audio
export const deleteAudio = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/audio/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Audio Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Video
export const deleteVideo = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/video/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Video Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await api.delete("/profile");

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert("Your account has been permanently deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

export const playAudio = (fileId) => async (dispatch) => {
  try {
    let musicContainer = document.getElementById("music-container");
    let audio = document.getElementById(fileId);
    const playBtn = document.getElementById(`btn${fileId}`);
    const isPlaying = musicContainer.classList.contains("play");
    if (isPlaying) {
      const playingBtn = document.querySelector(".btn.btn-dark.play");
      if (playBtn === playingBtn) {
        musicContainer.classList.remove("play");
        const playingAudio = document.querySelector("audio.play");
        playingBtn.querySelector("i.fas").classList.remove("fa-pause");
        playingBtn.querySelector("i.fas").classList.add("fa-play");
        playingBtn.classList.remove("play");
        playingAudio.classList.remove("play");
        playingAudio.pause();
      } else {
        const playingAudio = document.querySelector("audio.play");
        playingBtn.querySelector("i.fas").classList.remove("fa-pause");
        playingBtn.querySelector("i.fas").classList.add("fa-play");
        playingAudio.classList.remove("play");
        playingBtn.classList.remove("play");
        playingAudio.pause();
        playBtn.querySelector("i.fas").classList.remove("fa-play");
        playBtn.querySelector("i.fas").classList.add("fa-pause");
        playBtn.classList.add("play");
        audio.classList.add("play");
        audio.play();
      }
    } else {
      musicContainer.classList.add("play");
      playBtn.classList.add("play");
      playBtn.querySelector("i.fas").classList.remove("fa-play");
      playBtn.querySelector("i.fas").classList.add("fa-pause");
      audio.classList.add("play");
      audio.play();
    }
  } catch (err) {
    console.log(err);
    dispatch(setAlert("err playing song!", "danger"));
  }
};
