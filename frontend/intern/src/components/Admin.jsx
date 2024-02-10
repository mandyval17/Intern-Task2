import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../css/admin.css";
const Admin = () => {
  const [isPop, setIsPop] = useState(false);
  const [userData, setUserData] = useState([]);
  const [deviceData, setDeviceData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allDevices, setAllDevices] = useState([]);
  const [deviceId, setDeviceId] = useState();
  const [userId, setUserId] = useState();

  const allocate = async () => {
    if (deviceId == undefined) {
      return window.alert("Select Device");
    } else if (userId == undefined) {
      return window.alert("Select User");
    }
    try {
      console.log(
        "http://localhost:3001/allocatedevice/" + `${deviceId}/` + `${userId}`
      );
      const res = await axios.get(
        "http://localhost:3001/allocatedevice/" + `${deviceId}/` + `${userId}`
      );
      allUser();
      allDevice();
      return window.alert(`Assigned Device ${deviceId} to User ${userId}`);
    } catch (error) {
      console.log(error);
    }
  };
  const createUser = async () => {
    try {
      const res = await axios.get("http://localhost:3001/createuser");
      console.log(res);
      setUserData(res.data);
      allUser();
      allDevice();
    } catch (error) {
      console.log(error);
    }
  };
  const createDevice = async () => {
    try {
      const res = await axios.get("http://localhost:3001/createDevice");
      setDeviceData(res.data);
      allUser();
      allDevice();
    } catch (error) {
      console.log(error);
    }
  };
  const allUser = async () => {
    // console.log(allUsers.Device)
    try {
      const res = await axios.get("http://localhost:3001/allusers");
      setAllUsers(res.data);
      //   console.log(allUsers);
    } catch (error) {
      console.log(error);
    }
  };
  const allDevice = async () => {
    try {
      const res = await axios.get("http://localhost:3001/alldevices");
      setAllDevices(res.data);
      //   console.log(allDevices);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    allUser();
    allDevice();
  }, []);
  useEffect(() => {
    console.log(deviceId, userId);
  });
  return (
    <section>
      <div className="container-fluid admin-container">
        <div class="card " id="testing">
          <div class="card-body">
            <div className="first">
              <div className="Top">
                <a
                  className="btn btn-primary"
                  data-bs-toggle="collapse"
                  href="#collapseExample"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Create User
                </a>
              </div>
              <div className="collapse" id="collapseExample">
                <div className="cards">
                  <div className="card-body">
                    <div className="button">
                      <button className="btn card-button" onClick={createUser}>
                        Click here to create New user
                      </button>
                    </div>
                    <div className="data data-card">
                      {userData.map((post) => {
                        const { _id, Name, Password, Device } = post;
                        return (
                          <div className="" keys={_id}>
                            <h2>Name : {Name}</h2>
                            <h2>Password: {Password}</h2>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="second">
              <div className="Top">
                <a
                  className="btn btn-primary"
                  data-bs-toggle="collapse"
                  href="#collapseExample2"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Create Device
                </a>
              </div>
              <div className="collapse" id="collapseExample2">
                <div className="cards">
                  <div className="card-body">
                    <div className="button">
                      <button
                        className="btn card-button"
                        onClick={createDevice}
                      >
                        Click here to create New Device
                      </button>
                    </div>
                    <div className="data data-card">
                      {deviceData.map((post) => {
                        const { _id } = post;
                        return (
                          <div className="" keys={_id}>
                            <h3>Device Id : {_id}</h3>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>{" "}
              </div>
            </div>
            <div className="third">
              <div className="Top">
                <a
                  className="btn btn-primary"
                  data-bs-toggle="collapse"
                  href="#collapseExample3"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Click for all users
                </a>
              </div>
              <div className="collapse" id="collapseExample3">
                <div className="cards cards-render">
                  {/* <div className=""> */}
                  {allUsers.map((post) => {
                    const { _id, Name, Password, Device } = post;
                    return (
                      <div className="card" id={_id}>
                        <h2>UserId : {_id}</h2>
                        <h2>UserName : {Name}</h2>
                        <h2>UserPassword : {Password}</h2>
                        
                        <div class="dropdown">
                          <button
                            class="btn btn-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Show Devices
                          </button>
                          <ul class="dropdown-menu">
                            {Device.length != 0 ? (
                              Device.map((element) => {
                                return <li class="dropdown-item">{element}</li>;
                              })
                            ) : (
                              <li class="dropdown-item">Nothing to show</li>
                            )}
                          </ul>
                        </div>
                        <div className="rad">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefaults"
                            id="flexRadioDefault1"
                            // style={{fontSize:"1.2rem"}}
                            onClick={(e) =>
                              setUserId(
                                e.currentTarget.parentNode.parentNode.id
                              )
                            }
                          />
                          <label
                            className="form-check-label"
                            for="flexRadioDefault1"
                          >
                            <span style={{ color: "white" }}>Select User</span>
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>{" "}
              </div>
            </div>
            <div className="Fourth">
              <div className="Top">
                <a
                  className="btn btn-primary"
                  data-bs-toggle="collapse"
                  href="#collapseExample4"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Click for all Device
                </a>
              </div>

              <div className="collapse" id="collapseExample4">
                <div className="cards cards-render">
                  {allDevices.map((post) => {
                    const { _id, State, userId } = post;
                    return (
                      <div className="card" id={_id}>
                        <h2>{_id}</h2>
                        <h2>Light {State.light}</h2>
                        <h2>Fan {State.fan}</h2>
                        <h2>mis {State.mis}</h2>
                        <div class="dropdown">
                          <button
                            class="btn btn-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Show State
                          </button>
                          <ul class="dropdown-menu">
                            <li className="dropdown-item">fan:{State.fan}</li>
                            <li className="dropdown-item">
                              light:{State.light}
                            </li>
                            <li className="dropdown-item">mis:{State.mis}</li>
                          </ul>
                        </div>
                        {userId == null ? (
                          <div className="rad">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              onClick={(e) =>
                                setDeviceId(
                                  e.currentTarget.parentNode.parentNode.id
                                )
                              }
                            />

                            <label
                              className="form-check-label"
                              for="flexRadioDefault1"
                            >
                              Select Device
                            </label>
                          </div>
                        ) : (
                          <>Already Allocated to userId {userId}</>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="Top">
              <button type="button" class="btn btn-primary" onClick={allocate}>
                Click To allocate Devices To User
              </button>
            </div>
            {/* {isPop && <div className="card bg-primary">Hello</div>}

            <div className="btn btn-outline-danger" onClick={()=>{setIsPop(!isPop)}}>Press</div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
