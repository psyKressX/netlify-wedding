import React, { Component } from "react";

export class Header extends Component {
  render() {
    const white = { color: "white" };
    return (
      <div className="top">
        <div className="container p4">
          <h1 className="p-4" style={white}>
            Jade & Liam
          </h1>
          <h3 className="p-4" style={white}>
            are getting married
          </h3>
        </div>
        <div className="p-4">
          <h4 style={white}>July 31st, 2021</h4>
          <h4 style={white}>
            At the{" "}
            <a
              style={{
                color: "white",
                fontWeight: "500",
                textShadow: "0 0 6px #ff008e ",
              }}
              href="https://goo.gl/maps/bysyisDSeJqYC4Ae9"
              target="_blank"
              rel="noopener noreferrer"
            >
              Log Cabin Ranch.
            </a>
          </h4>
        </div>
      </div>
    );
  }
}

export default Header;
