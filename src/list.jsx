import React, { useEffect, useState } from "react";
import "./list.css";

export default function List() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("/.netlify/functions/getlist")
      .then((res) => res.json())
      .then((data) => {
        setList(data);
      })
      .catch((err) => console.log(err));
  }, []);
  const total = (() => {
    if (list.length === 0) return 0;
    return list.reduce((total, i) => {
      if (i.attending) return total + i.others.length + 1;
      else return total;
    }, 0);
  })();
  const staying = (() => {
    if (list.length === 0) return 0;
    return list.reduce((total, i) => {
      if (i.selection === "stay") return total + i.others.length + 1;
      else return total;
    }, 0);
  })();
  return (
    <div>
      <h3>TOTAL: {total}</h3>
      <h3>STAYING: {staying}</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Attending</th>
            <th>Plans</th>
            <th>Email</th>
            <th>Others</th>
            <th>Diet</th>
          </tr>
        </thead>
        <tbody>
          {list.map((guest, idx) => (
            <tr key={idx} className={guest.attending ? "Yes" : "No"}>
              <td>{guest.firstName + " " + guest.lastName}</td>
              <td>{guest.attending ? "Yes" : "No"}</td>
              <td>{guest.selection}</td>
              <td>{guest.email}</td>
              <Others others={guest.others} />
              <Diet diet={guest.diet} />
              <td>{}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Others = ({ others }) => {
  const clas = others.length > 0 ? "has" : "not";
  return (
    <td className={clas}>
      {clas}
      {others.length > 0 ? (
        <ul className="othersList">
          {others.map((o, idx) => (
            <li key={idx}>{o}</li>
          ))}
        </ul>
      ) : null}
    </td>
  );
};
const Diet = ({ diet }) => {
  const clas = diet ? "has" : "not";
  return (
    <td className={clas}>
      {clas}
      {diet ? <p className="diet">{diet}</p> : null}
    </td>
  );
};
