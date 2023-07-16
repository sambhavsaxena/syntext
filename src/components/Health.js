import { IconButton } from "@chakra-ui/react";
import React from "react";
import { BiLink } from "react-icons/bi";

export default function Health() {
  return (
    <div
      style={{
        border: "1px solid",
        borderRadius: "50px",
        padding: "12px",
        color: "white",
      }}
    >
      <IconButton
        mr={2}
        isRound="true"
        color="black"
        colorScheme="green"
        icon={<BiLink />}
      />{" "}
      Current server end-point:{" "}
      <a
        target={"_blank"}
        rel={"noreferrer"}
        style={{ color: "red" }}
        href={`${process.env.REACT_APP_SERVER_URL}`}
      >
        {process.env.REACT_APP_SERVER_URL}
      </a>
    </div>
  );
}
