import { IconButton } from "@chakra-ui/react";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useHistory } from "react-router-dom";

export default function DefaultPage() {
  const history = useHistory();
  const redirect = () => history.push("/");
  return (
    <div style={{ border: "1px solid", borderRadius: "50px", padding: "12px" }}>
      <IconButton
        mr={2}
        isRound="true"
        color="black"
        colorScheme="blue"
        icon={<BiArrowBack />}
        onClick={redirect}
      />{" "}
      Lost your way? Go home.
    </div>
  );
}
