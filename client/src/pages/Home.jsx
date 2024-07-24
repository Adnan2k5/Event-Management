import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Calendar, Badge, message, Modal } from "antd";
import { Container, TextField, Typography } from "@mui/material";
import "./home.css";
import { useForm } from "react-hook-form";
import axios from "axios";

export const Home = () => {
  const { register, handleSubmit } = useForm();
  const [user, setuser] = useState(null);
  const [openmodal, setmodal] = useState(false);
  const [events, setEvent] = useState([]);
  const [selectedDate,setDate] = useState(null);
  const [modal2,setmodal2] = useState(false);

  useEffect(() => {
    const user = jwtDecode(localStorage.getItem("token"));
    setuser(user);
  }, []);

  useEffect(() => {
    const getEvent = async (user) => {
      const res = await axios.post("http://localhost:8080/api/event/get", {
        user,
      });
      const transformedEvents = res.data.map((event) => ({
        title: event.title,
        description: event.description,
        date: new Date(event.date),
      }));
      setEvent(transformedEvents);
    };
    getEvent(user);
  }, [user]);

  const onSubmit = async (data) => {
    const event = data;
    try {
      const res = await axios.post("http://localhost:8080/api/event/", {
        ...event,
        user,
      });
      if (res.statusText === "OK") {
        message.success("Event Added");
      }
      setmodal(false);
    } catch (err) {
      console.log(err);
    }
  };
  const getListData = (value) => {
    const date = value.toDate();
    return events.filter(
      (event) =>
        event.date instanceof Date &&
        !isNaN(event.date) &&
        event.date.getFullYear() === date.getFullYear() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getDate() === date.getDate()
    );
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status="success" text={item.title} />
          </li>
        ))}
      </ul>
    );
  };

  const onSelect = (event)=>{
    console.log(event);
    setDate(event);
    setmodal2(true);
  }

  const handleOk = ()=>{
    setmodal2(false);
  }

  return (
    <Container className="p-4">
      <div className="header flex justify-between">
        <Typography variant="h4" className="mb-4">
          Welcome {user ? user.name : ""}
        </Typography>
        <button
          onClick={() => {
            setmodal(true);
          }}
        >
          Add Event
        </button>
      </div>
      <Modal
        title="Add Event"
        open={openmodal}
        onCancel={() => {
          setmodal(false);
        }}
        footer={false}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="my-4 flex flex-col">
          <TextField
            {...register("title")}
            type="text"
            label="Event Title"
            margin="normal"
          />
          <TextField
            {...register("description")}
            type="text"
            label="Event Description"
            margin="normal"
          />
          <TextField
            {...register("date")}
            InputLabelProps={{ shrink: true }}
            type="date"
            label="Event Date"
            margin="normal"
          />
          <button
            className="mt-2 bg-black text-white p-2 rounded-lg"
            type="submit"
          >
            Submit
          </button>
        </form>
      </Modal>
      <div className="events mt-5 p-4">
        <Calendar onSelect={onSelect} cellRender={dateCellRender} />
        <Modal title='Event' onCancel={()=>{setmodal(false)}} onOk={handleOk} open={modal2}>
          <p>{selectedDate ? selectedDate.format('YYYY-MM-DD'): 'no date selected'}</p>
        </Modal>
      </div>
    </Container>
  );
};
