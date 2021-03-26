import React from "react";
import { AiOutlineDownload } from "react-icons/ai";

export default function Maps() {
  const style = {
    maxWidth: "1400px",
    width: "100%",
    margin: "auto",
    paddingTop: "4em",
  };
  const heading = {
    fontFamily: "Cinzel",
    fontSize: "1.7rem",
  };
  return (
    <div style={style}>
      <p style={heading}>Maps</p>
      <Slide image={process.env.PUBLIC_URL + "/ranch.jpg"} />

      <Slide image={process.env.PUBLIC_URL + "/bunk.jpg"} />
    </div>
  );
}

const Slide = ({ image }) => {
  const imageStyle = {
    maxWidth: "1000px",
    width: "100%",

    margin: "auto",
  };
  const divStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    alignSelf: "center",
    maxwidth: "1000px",
    paddingBottom: "4em",
  };

  return (
    <div style={divStyle}>
      <div>
        <img style={imageStyle} src={image} alt="" />
      </div>
      <button className="download">
        <a style={{ lineHeight: "0.2em" }} href={image} download>
          <AiOutlineDownload />
        </a>
      </button>
    </div>
  );
};
