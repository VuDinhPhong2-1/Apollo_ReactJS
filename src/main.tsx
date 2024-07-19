import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline"; // Import từ @mui/material
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={client}>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Router>
        <App />
      </Router>
    </CssVarsProvider>
  </ApolloProvider>
);
