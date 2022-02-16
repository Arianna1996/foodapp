import React, { useRef, useState } from "react";
import classes from "./FormOrder.module.css";

const FormOrder = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState([
    "name",
    "surname",
    "email",
    "address",
    "ZIP code",
    "city",
  ]);

  const nameHandler = (e) => {
    if (e.target.value.trim().length > 0) {
      setName(e.target.value);
      setError((prev) => prev.filter((type) => type !== "name"));
    }
  };
  const surnameHandler = (e) => {
    if (e.target.value.trim().length > 0) {
      setSurname(e.target.value);
    }
    setError((prev) => prev.filter((type) => type !== "surname"));
  };
  const addressHandler = (e) => {
    if (e.target.value.trim().length > 0) {
      setAddress(e.target.value);
    }
    setError((prev) => prev.filter((type) => type !== "address"));
  };

  const zipHandler = (e) => {
    if (e.target.value.trim().length > 0) {
      setZip(e.target.value);
    }
    setError((prev) => prev.filter((type) => type !== "ZIP code"));
  };

  const cityHandler = (e) => {
    if (e.target.value.trim().length > 0) {
      setCity(e.target.value);
    }
    setError((prev) => prev.filter((type) => type !== "city"));
  };
  const emailHandler = (e) => {
    if (e.target.value.trim().length > 0) {
      setEmail(e.target.value);
    }
    setError((prev) => prev.filter((type) => type !== "email"));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (error.length === 0) {
      console.log(error);
      var orderInfo = {
        name: name,
        surname: surname,
        address: address,
        city: city,
        zip: zip,
        email: email,
      };
      console.log(orderInfo);
      props.onAddMeal(orderInfo);
      setMessage("");
    } else {
      setMessage(
        "The following fields are incorrect:" + error.map((er) => " " + er)
      );
    }
  };

  return (
    <>
      <h2 className={classes.titleForm}>Insert you info</h2>
      <form className={classes.formOrder} onSubmit={submitHandler}>
        <input type="text" placeholder="Name..." onChange={nameHandler}></input>

        <input
          type="text"
          placeholder="Surname..."
          onChange={surnameHandler}
        ></input>
        <input
          type="email"
          placeholder="Email..."
          onChange={emailHandler}
        ></input>

        <input
          type="text"
          placeholder="Address..."
          onChange={addressHandler}
        ></input>

        <input type="text" placeholder="City..." onChange={cityHandler}></input>

        <input
          type="text"
          placeholder="ZIP Code..."
          onChange={zipHandler}
        ></input>
        <div>{message}</div>
        <div className={classes.buttonOrderContainer}>
          <button type="submit" className={classes.buttonForm}>
            Complete order
          </button>
        </div>
      </form>
    </>
  );
};

export default FormOrder;
