import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: ${({ theme }) => theme.mobile}) {
        flex-direction: column;
    }
`;

export const StyledHeader = styled.header`
    background-color: ${({ theme }) => theme.colors.header};
    padding: 40px 0;
`;

export const StyledLink = styled(NavLink)`
    text-decoration: none;
    padding: 0px 20px;
    color: white;
    font-weight: 600;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 0.3rem;
    }

    &.active {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 0.3rem;
    }
`;
