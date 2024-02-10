import React, { useState, useEffect } from "react";
import axios from "axios";

function Device({ post, setPair }) {
  const [devState, setDevState] = useState(post.State);

  console.log("Hello", post.State);

  useEffect(() => {}, []);

  
  const handleFanChange = () => {
    setDevState({ ...devState, fan: 1 - devState.fan });
  };

  const handleLightChange = () => {
    setDevState({ ...devState, light: 1 - devState.light });
  };

  const handleMisChange = () => {
    setDevState({ ...devState, mis: 1 - devState.mis });
  };

  useEffect(() => {
    console.log("Updated by Dr. Bhungle", post._id);
    updateState(post._id);
  }, [devState]);

  const updateState = async (deviceId) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/updatestate/" + `${deviceId}`,
        devState,
        {
          headers: {
            "x-auth-token": localStorage.getItem("Token"),
          },
        }
      );
      if (
        res.data == "Unauthorized" ||
        res.data == "Token not found" ||
        res.data == "Invalid token"
      ) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 401 || error.response.status == 403) {
        window.location.href = "/login";
      }
    }
  };

  return (
    <div className="card" id={post._id}>
      <h2>Device Id : {post._id}</h2>
      <div class="toggling">
        <h2>Fan : {devState.fan}</h2>
        <button className="btn btn-click" onClick={handleFanChange}>
          toggle
        </button>
      </div>

      <div class="toggling">
        <h2>Light : {devState.light}</h2>
        <button className="btn btn-click" onClick={handleLightChange}>
          toggle
        </button>
      </div>

      <div class="toggling">
        <h2>mis : {devState.mis}</h2>
        <button className="btn btn-click" onClick={handleMisChange}>
          toggle
        </button>
      </div>
      {post.roomId == null ? (
        <div className="rad">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefaultsss"
            id="flexRadioDefault1"
            onClick={(e) => {
              setPair({
                ...parseInt,
                device_id: e.currentTarget.parentNode.parentNode.id,
              });
            }}
          />

          <label className="form-check-label" for="flexRadioDefault1">
            Select Device
          </label>
        </div>
      ) : (
        <>Already Assigned This Room to {post.roomId}</>
      )}
    </div>
  );
}

export default Device;
