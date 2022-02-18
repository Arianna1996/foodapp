import React, { useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const [name, setName] = useState("");
  const [nameIsValid, setNameIsValid] = useState(false);
  const [address, setAddress] = useState("");
  const [addressIsValid, setAddressIsValid] = useState(false);
  const [city, setCity] = useState("");
  const [cityIsValid, setCityIsValid] = useState(false);
  const [zip, setZip] = useState("");
  const [zipIsValid, setZipIsValid] = useState(false);
  const [message, setMessage] = useState(false);

  const nameHandler = (e) => {
    setName(e.target.value);
    if (e.target.value.trim().length > 0) {
      setNameIsValid(true);
    } else {
      setNameIsValid(false);
    }
  };
  const addressHandler = (e) => {
    setAddress(e.target.value);
    if (e.target.value.trim().length > 0) {
      setAddressIsValid(true);
    } else {
      setAddressIsValid(false);
    }
  };

  const zipHandler = (e) => {
    setZip(e.target.value);
    if (e.target.value.trim().length === 5) {
      setZipIsValid(true);
    } else {
      setZipIsValid(false);
    }
  };

  const cityHandler = (e) => {
    setCity(e.target.value);
    if (e.target.value.trim().length > 0) {
      setCityIsValid(true);
    } else {
      setCityIsValid(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (nameIsValid && addressIsValid && zipIsValid && cityIsValid) {
      var orderInfo = {
        name: name,
        address: address,
        city: city,
        zip: zip,
      };
      props.onAddMeal(orderInfo);
      setName("");
      setAddress("");
      setCity("");
      setZip("");
      setMessage("");
    } else {
      setMessage(true);
    }
  };

  return (
    <>
      <h2 className={classes.titleForm}>Insert you info</h2>
      <div className={classes.message}>{message}</div>
      <form className={classes.formOrder} onSubmit={submitHandler}>
        <div className={classes.inputContainer}>
          <input
            type="text"
            placeholder="Name..."
            onChange={nameHandler}
            value={name}
          ></input>
          <div className={classes.message}>
            {message && !nameIsValid ? <p>Insert a valid name</p> : ""}
          </div>
        </div>
        <div className={classes.inputContainer}>
          <input
            type="text"
            placeholder="Address..."
            onChange={addressHandler}
            value={address}
          ></input>
          <div className={classes.message}>
            {message && !addressIsValid ? <p>Insert a valid address</p> : ""}{" "}
            {/*All'invio del form message diventa true e 
            se il valore del relativo campo è falso compare il messaggio di errore*/}
          </div>
        </div>
        <div className={classes.inputContainer}>
          <input
            type="text"
            placeholder="City..."
            onChange={cityHandler}
            value={city}
          ></input>
          <div className={classes.message}>
            {message && !cityIsValid ? <p>Insert a valid city</p> : ""}
          </div>
        </div>
        <div className={classes.inputContainer}>
          <input
            type="number"
            placeholder="ZIP Code..."
            onChange={zipHandler}
            value={zip}
          ></input>
          <div className={classes.message}>
            {message && !zipIsValid ? <p>Insert a valid ZIP code</p> : ""}
          </div>
        </div>

        <div className={classes.buttonOrderContainer}>
          <button
            onClick={props.onClose}
            className={`${classes.buttonCancel} ${classes.button}`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`${classes.buttonForm} ${classes.button}`}
          >
            Complete order
          </button>
        </div>
      </form>
    </>
  );
};

export default Checkout;
