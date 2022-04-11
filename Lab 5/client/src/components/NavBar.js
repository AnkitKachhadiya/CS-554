import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav, StyledHeader, StyledLink } from "./styles/Header.styled";
import Images from "./Images";
import MyBin from "./MyBin";
import MyPosts from "./MyPosts";
import NewPost from "./NewPost";
import MostPopular from "./MostPopular";

function NavBar() {
    return (
        <BrowserRouter>
            <StyledHeader>
                <h1 className="logo">Binterest</h1>
                <Nav>
                    <StyledLink to="/">Images</StyledLink>
                    <StyledLink to="/my-bin">My Bin</StyledLink>
                    <StyledLink to="/my-posts">My Posts</StyledLink>
                    <StyledLink to="/popularity">Most Popular</StyledLink>
                </Nav>
            </StyledHeader>
            <Routes>
                <Route exact path="/" element={<Images />} />
                <Route exact path="/my-bin" element={<MyBin />} />
                <Route exact path="/my-posts" element={<MyPosts />} />
                <Route exact path="/new-post" element={<NewPost />} />
                <Route exact path="/popularity" element={<MostPopular />} />
            </Routes>
        </BrowserRouter>
    );
}

export default NavBar;
