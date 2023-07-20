import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MainContext } from "../../mainContext";
import { SocketContext } from "../../socketContext";
import { Flex, Heading, IconButton, Input } from "@chakra-ui/react";
import { RiArrowRightLine } from "react-icons/ri";
import { useToast } from "@chakra-ui/react";
import { UsersContext } from "../../usersContext";
import { Spinner } from "@chakra-ui/react";
import Footer from "../Footer";

const Login = () => {
  const socket = useContext(SocketContext);
  const history = useHistory();
  const toast = useToast();
  const { name, setName, room, setRoom } = useContext(MainContext);
  const { setUsers } = useContext(UsersContext);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    socket.on("users", (users) => {
      setUsers(users);
    });
  });
  const handleKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      if (name && room) handleClick();
    }
  };
  const handleClick = () => {
    setIsLoading(true);
    socket.emit("login", { name, room }, (error) => {
      if (error) {
        setIsLoading(false);
        return toast({
          position: "top",
          title: "Error",
          description: error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      history.push("/chat");
      setIsLoading(false);
      return toast({
        position: "top",
        title: "Hey there",
        description: `Welcome to ${room}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  return (
    <Flex className="login" flexDirection="column" mb="8">
      <Heading
        as="h1"
        size="4xl"
        color="whiteAlpha.800"
        textAlign="center"
        mb="8"
        fontFamily="DM Sans"
        fontWeight="600"
        letterSpacing="-2px"
      >
        <div style={{ textShadow: "-1px -1px 100px rgb(0, 0, 255)" }}>
          Syntext
        </div>
      </Heading>
      <Footer />
      <Flex
        className="form"
        gap="1rem"
        flexDirection={{ base: "column", md: "row" }}
        style={{ marginTop: "50px" }}
      >
        <Input
          onKeyDown={handleKeyDown}
          color="whiteAlpha.500"
          mr={{ base: "0", md: "4" }}
          mb={{ base: "4", md: "0" }}
          type="text"
          placeholder="User Name"
          autoFocus
          maxLength={"14"}
          value={name}
          onChange={(e) =>
            setName(e.target.value.toLowerCase().trim().split(/ +/).join(" "))
          }
        />
        <Input
          onKeyDown={handleKeyDown}
          color="whiteAlpha.500"
          mr={{ base: "0", md: "4" }}
          mb={{ base: "4", md: "0" }}
          type="text"
          placeholder="Room Name"
          value={room}
          maxLength={"14"}
          onChange={(e) =>
            setRoom(e.target.value.toLowerCase().trim().split(/ +/).join(" "))
          }
        />
        <IconButton
          style={{ border: "1px solid" }}
          colorScheme="black"
          isRound="true"
          icon={isLoading ? <Spinner size="md" /> : <RiArrowRightLine />}
          onClick={handleClick}
        ></IconButton>
      </Flex>
      <div></div>
    </Flex>
  );
};

export default Login;
