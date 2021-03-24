import React from "react";
import "./App.css";
import Header from "./components/header";
import Details from "./components/details";
import "bootstrap/dist/css/bootstrap.min.css";
import Drop from "./components/dropdown";
import Maps from "./components/maps";
import List from "./list";
import { Route, BrowserRouter, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/list" component={List} />
      </Switch>
    </BrowserRouter>
  );
}

const Main = () => {
  return (
    <div className="App">
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
        <Header />
        <div className="box">
          <div className="svg">
            <object
              alt="Welcome to our happily ever after"
              id="svg-object"
              data={process.env.PUBLIC_URL + "happ.svg"}
              type="image/svg+xml"
            ></object>
          </div>
          <br />
          <br />
          <Details />
          <Drop />
          <Maps />
        </div>
      </div>
    </div>
  );
};

export default App;
