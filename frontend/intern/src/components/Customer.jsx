import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Device from "./Device";
import "../css/customer.css";
const Customer = () => {
  const [userData, setUserData] = useState([]);
  const [singleroomdata, setSingleRoomData] = useState([]);
  const [allroomdata, setAllRoomData] = useState([]);
  const [room, setRoom] = useState("");
  const [pair, setPair] = useState({ room_id: null, device_id: null });

  const getDevice = async () => {
    try {
      let res = await axios.get("http://localhost:3001/useralldevices", {
        headers: {
          "x-auth-token": localStorage.getItem("Token"),
        },
      });
      setUserData(res.data);
    } catch (error) {
      if (error.response.status == 401 || error.response.status == 403) {
        window.location.href = "/login";
      }
    }
  };
  const createRoom = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/createroom",
        {
          Name: room,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("Token"),
          },
        }
      );
      setSingleRoomData(res.data);
      allRooms();
    } catch (error) {
      if (error.response.status == 401 || error.response.status == 403) {
        window.location.href = "/login";
      }
    }
  };
  const allRooms = async () => {
    try {
      const res = await axios.get("http://localhost:3001/allrooms", {
        headers: {
          "x-auth-token": localStorage.getItem("Token"),
        },
      });
      if (
        res.data == "Unauthorized" ||
        res.data == "Token not found" ||
        res.data == "Invalid token"
      ) {
        window.location.href = "/login";
      }
      setAllRoomData(res.data);
    } catch (error) {
      console.log(error);
      if (error.response.status == 401 || error.response.status == 403) {
        window.location.href = "/login";
      }
    }
  };

  const allocateRoom = async () => {
    if (!pair.device_id) {
      return window.alert("Select Device");
    } else if (!pair.room_id) {
      return window.alert("Select Room");
    }
    try {
      const res = await axios.get(
        "http://localhost:3001/assignroom/" +
          `${pair.room_id}/${pair.device_id}`,
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
      allRooms();
    getDevice();
      window.alert(`Assigned Room ${pair.room_id} to Device ${pair.device_id}`);
    } catch (error) {
      console.log(error);
      if (error.response.status == 401 || error.response.status == 403) {
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    allRooms();
    getDevice();
  }, []);
  console.log("bhingle", userData);
  return (
    <section>
      <div className="container-fluid admin-container">
        <div className="card">
          <div className="card-body">
            <div className="first">
              <div className="Top">
                <a
                  className="btn btn-primary"
                  data-bs-toggle="collapse"
                  href="#collapseExample5"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Get All Devices
                </a>
              </div>
              <div className="collapse" id="collapseExample5">
                <div className="cards cards-render">
                  {userData.map((post) => {
                    return <Device post={post} setPair={setPair} />;
                  })}
                </div>
              </div>
            </div>
            <div className="second">
              <div className="Top">
                <a
                  className="btn btn-primary"
                  data-bs-toggle="collapse"
                  href="#collapseExample6"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Create Room
                </a>
              </div>
              <div className="collapse" id="collapseExample6">
                <div id="form-main">
                  <div
                    className="card-body"
                    id="for-form"
                  >
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (e.target.checkValidity()) {
                          console.log("...");
                          createRoom();
                        }
                      }}
                    >
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">
                          Room Name
                        </label>
                        <input
                          onChange={(e) => {
                            setRoom(e.target.value);
                          }}
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <button type="submit" class="btn btn-primary">
                        CreateRoom
                      </button>
                    </form>
                    <div className="data">
                      {singleroomdata.map((post) => {
                        console.log(post);
                        const { _id, Name, userId } = post;
                        return (
                          <div className="cards" id="formcard">
                            <h2>Room ID : {_id}</h2>
                            <h2>Room Name : {Name}</h2>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="third">
              <div className="Top">
                <a
                  className="btn btn-primary"
                  data-bs-toggle="collapse"
                  href="#collapseExample7"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  All Rooms
                </a>
              </div>

              <div className="collapse" id="collapseExample7">
                <div className="cards cards-render">
                  {allroomdata.map((post) => {
                    const { _id, Name, userId, deviceId } = post;
                    return (
                      <div className="card" id={_id}>
                        <h2>{_id}</h2>
                        <h2>{Name}</h2>
                        {deviceId == null ? (
                          <div className="rad">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefaultss"
                              id="flexRadioDefault1"
                              onClick={(e) => {
                                setPair({
                                  ...pair,
                                  room_id:
                                    e.currentTarget.parentNode.parentNode.id,
                                });
                              }}
                            />

                            <label
                              className="form-check-label"
                              for="flexRadioDefault1"
                            >
                              Select Room
                            </label>
                          </div>
                        ) : (
                          <>Already Assigned This Room to {deviceId}</>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="Top">
              <button
                type="button"
                class="btn btn-primary"
                onClick={allocateRoom}
              >
                Click To allocate Devices To User
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customer;
