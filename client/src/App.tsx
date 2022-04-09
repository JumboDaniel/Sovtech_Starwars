import React from "react";
import "./styles/App.css";
import StarWarsLogo from "./images/Star_Wars_Logo.svg.png";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import People from "./components/people";
import Details from "./components/details";


const client = new ApolloClient({
  uri: "https://apollographqlstarwars.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <img
            src={StarWarsLogo}
            alt="Star Wars Logo"
            className="star_wars_logo"
            width={550}
            height={300}
          />
          <Routes>
          <Route path="/"  element={<People/>}/>
          <Route path="/details/:name"  element={<Details/>}/>
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
