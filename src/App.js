import React from "react";
import ReactDOM from "react-dom/client";
// import "./App.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import Todolist from "./Todolist";
import theme from "./theme";

function App () {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Todolist />
    </ChakraProvider>
  );
}

export default App;