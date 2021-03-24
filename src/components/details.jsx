import React, { Component } from "react";

export class Details extends Component {
  render() {
    return (
      <div className="container">
        <div className="p-4 mt-4">
          <table>
            <tr>
              <td>
                <p class="key">Where</p>
              </td>
              <td>
                <p>Log Cabin Ranch, 55-57 Rankins Rd, Monbulk VIC 3793</p>
              </td>
            </tr>
            <tr>
              <td>
                <p class="key">Date</p>
              </td>
              <td>
                <p>June 6th, 2021</p>
              </td>
            </tr>
            <tr>
              <td>
                <p class="key">Time</p>
              </td>
              <td>
                <p>3pm ceremony start, arrive by 2:45pm</p>
              </td>
            </tr>
          </table>
          <br />
          <br />
          <p>
            Come and join Liam and Jade for their festival wedding at the{" "}
            <a
              style={{ color: "#a15750" }}
              href="https://goo.gl/maps/bysyisDSeJqYC4Ae9"
              target="_blank"
              rel="noopener noreferrer"
            >
              Log Cabin Ranch.
            </a>{" "}
            The ranch has complimentary accommodation for up to 70 guests (BYO
            blankets, pillows &#38; sheets) so you can celebrate late into the
            night with us and wake for a camp-style breakfast in the morning.
          </p>
        </div>
      </div>
    );
  }
}

export default Details;
