import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav, StyledHeader, StyledLink } from "./styles/Header.styled";
import Images from "./Images";
import MyBin from "./MyBin";

function NavBar() {
    return (
        <BrowserRouter>
            <StyledHeader>
                <Nav>
                    <StyledLink to="/">Images</StyledLink>
                    <StyledLink to="/my-bin">My Bin</StyledLink>
                    <StyledLink to="/my-posts">My Posts</StyledLink>
                </Nav>
            </StyledHeader>
            <Routes>
                <Route exact path="/" element={<Images />} />
                <Route exact path="/my-bin" element={<MyBin />} />
                <Route exact path="/my-posts" element={<Images />} />
                <Route exact path="/new-post" element={<Images />} />
            </Routes>
        </BrowserRouter>
    );
}

export default NavBar;
