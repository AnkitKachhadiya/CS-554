import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Images from "./components/Images";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000",
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Images />
        </ApolloProvider>
    );
}

export default App;
