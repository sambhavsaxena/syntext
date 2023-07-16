import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SocketProvider } from "./socketContext";
import { MainProvider } from "./mainContext";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { UsersProvider } from "./usersContext";
import DefaultPage from "./components/DefaultPage";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import Health from "./components/Health";
import "./App.css";
function App() {
  return (
    <ChakraProvider>
      <MainProvider>
        <UsersProvider>
          <SocketProvider>
            <Flex className="App" align="center" justifyContent="center">
              <Router>
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route path="/chat" component={Chat} />
                  <Route path="/health" component={Health} />
                  <Route component={DefaultPage} />
                </Switch>
              </Router>
            </Flex>
          </SocketProvider>
        </UsersProvider>
      </MainProvider>
    </ChakraProvider>
  );
}
export default App;
