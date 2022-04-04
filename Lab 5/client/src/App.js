import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import NavBar from "./components/NavBar";
import GlobalStyles from "./components/styles/Global";

const theme = {
    colors: {
        primary: "#1c49c2",
        header: "#1c49c2",
        body: "#eaeef0",
        footer: "#003333",
    },
    fonts: `Poppins, sans-serif`,
};

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000",
});

function App() {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <NavBar />
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default App;
