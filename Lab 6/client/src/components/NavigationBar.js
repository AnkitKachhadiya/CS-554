import React from "react";

import { Navbar, Nav, Container } from "react-bootstrap";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./Home";
import NotFound from "./NotFound";
import Pokemon from "./Pokemon";
import SinglePokemon from "./SinglePokemon";
import Trainers from "./Trainers";

function NavigationBar() {
    return (
        <>
            <BrowserRouter>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand as={Link} to="/" aria-label="Marvel Logo">
                            <img
                                src="/pokemon-logo.png"
                                alt="pokemon logo"
                                height="50"
                            />
                        </Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link
                                as={Link}
                                to="/trainers"
                                className="text-uppercase font-weight-bold"
                            >
                                Trainers
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/pokemon/page/0"
                                className="text-uppercase font-weight-bold"
                            >
                                Pokémon
                            </Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/trainers" element={<Trainers />} />
                    <Route
                        path="/pokemon/page/:pageNum"
                        element={<Pokemon />}
                    />
                    <Route path="/pokemon/:id" element={<SinglePokemon />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default NavigationBar;
