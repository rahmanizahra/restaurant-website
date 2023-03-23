import React, { useState, useEffect } from "react";
import StartFirebase from "../../firebaseManage";
import { ref, set, get, update, remove, child } from "firebase/database";
import classes from "../Cart/Checkout.module.css";
import Card from "../UI/Card";

function ManageMeal(props) {
  const [state, setState] = useState({
    db: " ",
    title: " ",
    description: " ",
    price: " ",
  });
  console.log(state);
  useEffect(() => {
    setState({ db: StartFirebase() });
  }, []);

  function getAllInputs() {
    return {
      title: state.title,
      description: state.description,
      price: Number(state.price),
    };
  }

  function insertData() {
    const db = state.db;
    const data = getAllInputs();
    set(ref(db, "meals/" + data.title), {
      title: data.title,
      description: data.description,
      price: data.price,
    })
      .then(() => {
        alert("Data was added successfully");
      })
      .catch((error) => {
        alert("There was an error, details: " + error);
      });
  }

  function updateData() {
    const db = state.db;
    const data = getAllInputs();
    update(ref(db, "meals/" + data.title), {
      title: data.title,
      description: data.description,
      price: data.price,
    })
      .then(() => {
        alert("Data was updates successfully");
      })
      .catch((error) => {
        alert("There was an error, details: " + error);
      });
  }

  function deleteData() {
    const db = state.db;
    const title = getAllInputs().title;
    remove(ref(db, "meals/" + title))
      .then(() => {
        alert("Data was deleted successfully");
      })
      .catch((error) => {
        alert("There was an error, details: " + error);
      });
  }

  function selectData() {
    const dbref = ref(state.db);
    const title = getAllInputs().title;
    get(child(dbref, "meals/" + title))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setState({
            title: snapshot.val().title,
            description: snapshot.val().description,
            price: snapshot.val().price,
          });
        } else {
          alert("no Data found !");
        }
      })
      .catch((error) => {
        alert("There was an error, details: " + error);
      });
  }

  function handleClick(event) {
    setState({ db: StartFirebase() });
    const id = event.target.id;
    if (id === "addBtn") {
      insertData();
    } else if (id === "updateBtn") {
      updateData();
    } else if (id === "deletBtn") {
      deleteData();
    } else if (id === "selectBtn") {
      selectData();
    }
  }

  return (
    <div className={classes.container}>
      <Card>
        <h2> Meals Management </h2>{" "}
        <div className={classes.control}>
          <label htmlFor="title"> Title </label>{" "}
          <input
            type="text"
            id="title"
            // value={state.title}
            onChange={(e) => setState({ title: e.target.value })}
          />{" "}
        </div>{" "}
        <div className={classes.control}>
          <label htmlFor="des"> Description </label>{" "}
          <input
            type="text"
            id="des"
            // value={state.description}
            onChange={(e) => setState({ description: e.target.value })}
          />{" "}
        </div>{" "}
        <div className={classes.control}>
          <label htmlFor="price"> Price </label>{" "}
          <input
            type="number"
            id="price"
            min={1}
            max={5}
            // value={state.price}
            onChange={(e) => setState({ price: e.target.value })}
          />{" "}
        </div>{" "}
        <div className={classes.actions}>
          <button id="addBtn" className={classes.submit} onClick={handleClick}>
            {" "}
            Add{" "}
          </button>{" "}
          <button
            id="deletBtn"
            className={classes.submit}
            onClick={handleClick}
          >
            {" "}
            Delete{" "}
          </button>{" "}
          <button
            id="updateBtn"
            className={classes.submit}
            onClick={handleClick}
          >
            {" "}
            Edit{" "}
          </button>{" "}
          <button
            id="selectBtn"
            className={classes.submit}
            onClick={handleClick}
          >
            {" "}
            Get Data from db{" "}
          </button>{" "}
        </div>{" "}
      </Card>{" "}
    </div>
  );
}

export default ManageMeal;
