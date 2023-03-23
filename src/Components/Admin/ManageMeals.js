import React from "react";
import StartFirebase from "../../firebaseManage";
import { ref, set, get, update, remove, child } from "firebase/database";
import classes from "../Cart/Checkout.module.css";
import Card from "../UI/Card";
import { Link } from "react-router-dom";

export default function ManageMeals() {
  return (
    <>
      <ManageMealClass />
      <div className={classes.back}>
        <Link to="/admin"> Back </Link>{" "}
      </div>
    </>
  );
}

class ManageMealClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      db: " ",
      title: " ",
      description: " ",
      price: " ",
    };
    this.interface = this.interface.bind(this);
  }
  componentDidMount() {
    this.setState({
      db: StartFirebase(),
    });
  }

  render() {
    return (
      <>
        <div className={classes.container}>
          <Card>
            {" "}
            <h2> Meals Management </h2>{" "}
            <div className={classes.control}>
              <label htmlFor="title"> Title </label>{" "}
              <input
                type="text"
                id="title"
                value={this.state.title}
                onChange={(e) => {
                  this.setState({ title: e.target.value });
                }}
              />{" "}
            </div>{" "}
            <div className={classes.control}>
              <label htmlFor="des"> Description </label>{" "}
              <input
                type="text"
                id="des"
                value={this.state.description}
                onChange={(e) => {
                  this.setState({ description: e.target.value });
                }}
              />{" "}
            </div>{" "}
            <div className={classes.control}>
              <label htmlFor="price"> Price </label>{" "}
              <input
                type="number"
                id="price"
                min={1}
                max={5}
                value={this.state.price}
                onChange={(e) => {
                  this.setState({ price: e.target.value });
                }}
              />{" "}
            </div>{" "}
            <div className={classes.actions}>
              <button
                id="addBtn"
                className={classes.submit}
                onClick={this.interface}
              >
                {" "}
                Add{" "}
              </button>{" "}
              <button
                id="deletBtn"
                className={classes.submit}
                onClick={this.interface}
              >
                {" "}
                Delete{" "}
              </button>{" "}
              <button
                id="updateBtn"
                className={classes.submit}
                onClick={this.interface}
              >
                {" "}
                Edit{" "}
              </button>{" "}
              <button
                id="selectBtn"
                className={classes.submit}
                onClick={this.interface}
              >
                {" "}
                Get Data from db{" "}
              </button>{" "}
            </div>{" "}
          </Card>{" "}
        </div>{" "}
      </>
    );
  }

  interface(event) {
    const id = event.target.id;
    if (id === "addBtn") {
      this.insertData();
    } else if (id === "updateBtn") {
      this.updateData();
    } else if (id === "deletBtn") {
      this.deleteData();
    } else if (id === "selectBtn") {
      this.selectData();
    }
  }

  getAllInputs() {
    return {
      title: this.state.title,
      description: this.state.description,
      price: Number(this.state.price),
    };
  }

  insertData() {
    const db = this.state.db;
    const data = this.getAllInputs();
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
    this.setState({
      title: " ",
      description: " ",
      price: " ",
    });
  }

  updateData() {
    const db = this.state.db;
    const data = this.getAllInputs();
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

  deleteData() {
    const db = this.state.db;
    const title = this.getAllInputs().title;
    remove(ref(db, "meals/" + title))
      .then(() => {
        alert("Data was deleted successfully");
      })
      .catch((error) => {
        alert("There was an error, details: " + error);
      });
  }

  selectData() {
    const dbref = ref(this.state.db);
    const title = this.getAllInputs().title;
    get(child(dbref, "meals/" + title))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.setState({
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
}
