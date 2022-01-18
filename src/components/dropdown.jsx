import React, { useState, useRef } from "react";
import { Collapse } from "react-bootstrap";
import Addition from "./addition";
import { AiOutlinePlusCircle } from "react-icons/ai";

const keyVal = {
  firstName: "first Name",
  lastName: "Last Name",
  attending: "Attending Status",
  email: "Email",
  selection: "Plans",
};

export default function Drop() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [form, setForm] = useState({
    firstName: null,
    lastName: null,
    attending: null,
    email: null,
    diet: null,
    selection: null,
  });
  const [formErrors, setFormErrors] = useState({
    firstName: null,
    lastName: null,
    attending: null,
    email: null,
    selection: null,
    sent: false,
  });
  const [others, setOthers] = useState([]);

  const ref = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let preForm = { ...form };
    preForm[name] = value;
    setForm(preForm);
  };
  const handleBool = (e) => {
    const { name, value } = e.target;
    let preForm = { ...form };
    preForm[name] = JSON.parse(value);
    setForm(preForm);
  };

  const remove = (i) => {
    let curr = [...others];
    curr.splice(i, 1);
    setOthers(curr);
  };
  const set = (i, e) => {
    let curr = [...others];
    curr[i] = e;
    setOthers(curr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/.netlify/functions/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ form, others }),
    })
      .then((res) => {
        if (res.status === 400) {
          res.json().then((data) => {
            setFormErrors(data);
          });
        }
        if (res.status === 200) {
          let preForm = { ...formErrors };
          preForm.success = "Thank you for registering!";
          setFormErrors(preForm);
          setOpen1(false);
          setOpen2(false);
          ref.current.scrollIntoView({
            behavior: "smooth",
          });
        }
      })
      .catch((err) => {
        console.log("this is error", err);
      });
  };
  let err = "";
  Object.keys(formErrors).forEach((e) => {
    if (formErrors[e]) {
      err = err.length > 0 ? err + ", " + keyVal[e] : err + " " + keyVal[e];
    }
  });

  return (
    <div id="rsvp" className=" pb-2">
      {!formErrors.success && (
        <button onClick={() => setOpen1((t) => !t)} className="btn-custom">
          RSVP
        </button>
      )}

      <div>
        {formErrors.success && (
          <div ref={ref}>
            <p
              className="pt-4"
              style={{ fontFamily: "Cinzel", fontSize: "1.7rem" }}
            >
              {formErrors.success}
            </p>
          </div>
        )}

        <Collapse in={open1}>
          <div>
            <form onSubmit={handleSubmit}>
              <div className=" p-2 form-group mx-sm-3">
                <label className="mr-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  className="form-control"
                ></input>
                {formErrors.firstName !== null && (
                  <div>
                    <small className="error">{formErrors.firstName}</small>
                  </div>
                )}
              </div>

              <div className="p-2 form-group mx-sm-3">
                <label className="mr-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  className="form-control"
                ></input>
                {formErrors.lastName !== null && (
                  <div>
                    <small className="error">{formErrors.lastName}</small>
                  </div>
                )}
              </div>

              <div className="p-2 form-group mx-sm-3">
                <label className="mr-2">Will you be attending?</label>
                <select
                  name="attending"
                  onChange={(e) => {
                    handleBool(e);
                    setOpen2(JSON.parse(e.target.value));
                  }}
                  defaultValue="DEFAULT"
                  className="form-control"
                >
                  <option disabled hidden value="DEFAULT"></option>
                  <option value={true}>YES!</option>
                  <option value={false}>Sorry, I can not attend.</option>
                </select>
                {formErrors.attending !== null && (
                  <div>
                    <small className="error">{formErrors.attending}</small>
                  </div>
                )}
              </div>

              <Collapse in={open2}>
                <div className="container">
                  <div className="p-2 form-group mx-sm-3">
                    <label className="mr-2">Email</label>
                    <input
                      type="text"
                      name="email"
                      onChange={handleChange}
                      className="form-control"
                    ></input>
                    {formErrors.email !== null && (
                      <div>
                        <small className="error">{formErrors.email}</small>
                      </div>
                    )}
                  </div>
                  <div className="p-2 form-group mx-sm-3">
                    <label className="mr-2">Dietary requirements?</label>
                    <textarea
                      type="text"
                      name="diet"
                      onChange={handleChange}
                      className="form-control"
                    ></textarea>
                  </div>
                  <br />
                  <p className="error">
                    For our COVIDSafe plan, we are required to inform the venue
                    ahead of time of the number of guests that wish to stay on
                    the premises. We have complimentary accommodation for up to
                    70 guests, so if you can, we would love for you to spend the
                    night with us!
                  </p>
                  <div className="p-2 form-group mx-sm-3">
                    <label className="mr-2">Plans</label>
                    <select
                      name="selection"
                      onChange={handleChange}
                      defaultValue="DEFAULT"
                      className="form-control"
                    >
                      <option disabled hidden value="DEFAULT"></option>

                      <option value="stay">Staying</option>

                      <option value="leave">Leaving</option>
                    </select>
                    {formErrors.selection !== null && (
                      <div>
                        <small className="error">{formErrors.selection}</small>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="mr-2">Who is coming with you?</label>
                    {others.map((i, idx) => (
                      <Addition
                        key={idx}
                        set={set}
                        remove={remove}
                        idx={idx}
                        val={others[idx]}
                      />
                    ))}
                    <div>
                      <button
                        type="button"
                        className="iconic"
                        onClick={() => setOthers([...others, ""])}
                      >
                        <AiOutlinePlusCircle />
                      </button>
                    </div>
                  </div>
                </div>
              </Collapse>

              {err.length > 0 && (
                <div>
                  <small className="error">Errors at {err}</small>
                </div>
              )}

              <div className="form-group pb-2 pt-4 d-flex justify-content-end">
                <button className="btn-custom" action="onSubmit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </Collapse>
      </div>
    </div>
  );
}
