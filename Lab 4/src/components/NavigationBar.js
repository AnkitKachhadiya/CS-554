import React from "react";

import { Navbar, Nav, Container } from "react-bootstrap";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./Home";
import Characters from "./Characters";
import Comics from "./Comics";
import Series from "./Series";

function NavigationBar() {
    return (
        <>
            <BrowserRouter>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand as={Link} to="/">
                            Marvel
                        </Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/characters">
                                Characters
                            </Nav.Link>
                            <Nav.Link as={Link} to="/comics">
                                Comics
                            </Nav.Link>
                            <Nav.Link as={Link} to="/series">
                                Series
                            </Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/characters" element={<Characters />} />
                    <Route path="/comics" element={<Comics />} />
                    <Route path="/series" element={<Series />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default NavigationBar;
