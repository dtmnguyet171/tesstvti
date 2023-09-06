import axios from "axios";
import * as React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { Button, Divider, Space, notification } from "antd";
import { Context } from "./../../routes/root";
export default function DataEditComponent() {
  const [contact, setContact] = useState({ name: "", address: "", avatar: "" });
  const paramUrl = useParams("id");

  const navigate = useNavigate();

  const inputRefName = useRef(null);
  const inputRefAress = useRef(null);
  
  const [api, contextHolder] = notification.useNotification();
  const handleCancel = () => {
    navigate("/data")
  }
  const inputRefAvatar = useRef(null);
  const openNotification = (placement) => {
    api.info({
      message: `Notification ${placement}`,
      description: (
        <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>
      ),
      placement,
    });
  };
  const handleSubmit = async () => {
    console.log(inputRefName.current.value);
    const dataPost = {
      name: inputRefName.current.value,
      address: inputRefAress.current.value,
      avatar: inputRefAvatar.current.value,
    };
    await axios
      .put(
        "https://643d4c71f0ec48ce90586caf.mockapi.io/Account/" +
          `/${paramUrl?.id}`,
        dataPost
      )
      .then((res) => {
        openNotification("topLeft")
      })
      .then(() => {
        setTimeout(() => {
            navigate('/data');
        }, 3000);
    }).catch(err => console.log(err, 'opp'));
    return;
  };
  useEffect(() => {
    let data = "";
    axios
      .get(
        "https://643d4c71f0ec48ce90586caf.mockapi.io/Account/" +
          `/${paramUrl?.id}`
      )
      .then((res) => setContact(res.data))
      .then();
  }, []);

  return (
    <>
      <Form id="contact-form">
        <p>
          <span>Name</span>
          <input
            placeholder="name"
            aria-label="Last name"
            type="text"
            name="name"
            ref={inputRefName}
            defaultValue={contact.name}
          />
        </p>
        <label>
          <span>Adress</span>
          <input
            type="text"
            name="address"
            placeholder="@jack"
            defaultValue={contact.address}
            ref={inputRefAress}
          />
        </label>
        <label>
          <span>Avatar</span>
          <input
            placeholder="https://example.com/avatar.jpg"
            aria-label="Avatar URL"
            type="text"
            name="avatar"
            defaultValue={contact.avatar}
            ref={inputRefAvatar}
          />
        </label>

        <p>
          {contextHolder}
          <Button type="primary" onClick={() => openNotification("topLeft")}>
            topLeft
          </Button>
          <button type="button" onClick={handleSubmit}>
            Save
          </button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </p>
      </Form>
    </>
  );
}
