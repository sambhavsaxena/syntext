import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SocketProvider } from "./socketContext";
import { MainProvider } from "./mainContext";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { UsersProvider } from "./usersContext";
import DefaultPage from "./components/DefaultPage";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <MainProvider>
        <UsersProvider>
          <SocketProvider>
            <Flex className="App" align="center" justifyContent="center">
              <Router>
                <Routes>
                  <Route exact path="/" element={<Login />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route element={<DefaultPage />} />
                </Routes>
              </Router>
            </Flex>
          </SocketProvider>
        </UsersProvider>
      </MainProvider>
    </ChakraProvider>
  );
}
export default App;
