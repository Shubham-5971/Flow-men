import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { IoCloseCircle } from "react-icons/io5";
import styled from "styled-components";

const CloseButton = styled.button`
  position: absolute;
  top: 10px; /* Adjust the top position as needed */
  right: 10px; /* Adjust the left position as needed */
  border: none;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
  font-size: 1.5rem;
  transition: transform 0.2s, color 0.2s;

  &:hover {
    transform: scale(1.1); /* Increase size on hover */
    color: #0f0e0e; /* Change color on hover */
  }
`;

const SubErrorMessage = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  color: #000000;
`;

function Popup({ setToast, alert, subMesg }) {
  const [now, setNow] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow((prevNow) => {
        const newNow = prevNow + 4;
        return newNow > 100 ? 100 : newNow;
      });
    }, 125);
    return () => clearInterval(interval);
  }, []);

  let backgroundColor, message;
  if (alert) {
    backgroundColor = "linear-gradient(182deg, #df0000, #c54444)";
    message = "Error!";
  } else {
    backgroundColor = "linear-gradient(182deg, #00cc00, #44c544)";
    message = "Success! ";
  }

  return (
    <>
      <div
        className="d-inline-block m-1 "
        style={{
          background: backgroundColor,
          height: "84px",
          width: "250px",
          borderRadius: "3px",
        }}
      >
        <div style={{ display: "flex", height: "30px" }}>
          <p
            style={{
              marginLeft: "10px",
              fontSize: "18px",
              fontWeight: 600,
              alignItems: "center",
              fontFamily: "Georgia, serif",
              color: "#fff",
              textShadow:
                "2px 2px 4px rgba(0, 0, 0, 0.3)" /* Text shadow for depth */,
            }}
          >
            {message}
          </p>
          <CloseButton onClick={() => setToast(false)}>
            <IoCloseCircle />
          </CloseButton>
        </div>
        <div style={{ alignItems: "center", marginLeft: "10px" }}>
          <SubErrorMessage style={{ color: "#fff" }}>
            {subMesg}
          </SubErrorMessage>
        </div>
        <footer>
          <small
            style={{
              position: "relative",
              top: "12px",
              left: "0",
              zIndex: 11,
            }}
          >
            <ProgressBar
              style={{ height: "0.5vh", backgroundColor: "#f6aaaa" }}
              variant="light"
              now={now}
            />
          </small>
        </footer>
      </div>
    </>
  );
}

export default Popup;



