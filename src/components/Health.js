import { IconButton } from "@chakra-ui/react";
import React from "react";

export default function Health() {
  return (
    <div
      style={{
        border: "1px solid",
        borderRadius: "50px",
        padding: "12px",
        color: "white",
      }}>
      <a
        target={"_blank"}
        rel={"noreferrer"}
        style={{ color: "white" }}
        href={`${process.env.REACT_APP_SERVER_URL}`}
      >
        {process.env.REACT_APP_SERVER_URL}
      </a>
    </div>
  );
}
