import React from "react";
import NavigationBar from "./components/NavigationBar";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000",
});

function App() {
    return (
        <ApolloProvider client={client}>
            <NavigationBar />
        </ApolloProvider>
    );
}

export default App;
