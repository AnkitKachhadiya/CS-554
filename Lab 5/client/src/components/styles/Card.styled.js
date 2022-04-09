import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const Card = styled.div`
    background: white;
    transition: 0.3s;
    border-radius: 5px;
    margin-top: 1.5rem;

    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }

    & > label {
        cursor: pointer;
    }
`;

export const ImageContainer = styled.div`
    width: 100%;
    height: 520px;
    position: relative;
    text-align: center;
`;

export const Image = styled.img`
    padding: 15px;
    border-radius: 20px;
    max-width: 100%;
    max-height: 100%;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: auto;
`;

export const CardBody = styled.div`
    padding: 0 16px 16px;
    display: flex;
    justify-content: space-between;
`;

export const CardText = styled.div`
    padding-right: 10px;

    p {
        margin: 0;
    }

    & > p:last-child {
        font-size: 12px;
    }

    & > p {
        font-size: 14px;
    }
`;

export const CardButton = styled.div``;

export const CardContainer = styled.div`
    width: 50%;
    margin: 0 auto 1.5rem auto;
`;

const buttonStyles = () => css`
    background-color: ${({ bg }) => bg || "#e60023"};
    box-sizing: border-box;
    position: relative;
    user-select: none;
    cursor: pointer;
    outline: none;
    border: none;
    display: inline-block;
    white-space: nowrap;
    text-decoration: none;
    vertical-align: baseline;
    text-align: center;
    margin: 0;
    min-width: 64px;
    line-height: 36px;
    padding: 0 16px;
    border-radius: 4px;
    overflow: visible;
    transform: translate3d(0, 0, 0);
    transition: background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),
        box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    font-family: ${({ theme }) => theme.fonts};
    box-shadow: 0 3px 1px -2px #0003, 0 2px 2px #00000024, 0 1px 5px #0000001f;
`;

export const StyledButton = styled.button(buttonStyles);
export const StyledLink = styled(Link)(buttonStyles);

export const LoadMoreContainer = styled.div`
    text-align: center;
    margin: 25px 0;
`;

export const InputContainer = styled.div`
    text-align: center;
    padding: 2.5rem;
`;

export const StyledInput = styled.input`
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &[type="text"]:focus {
        outline: none;
    }
`;

export const FormControl = styled.div`
    text-align: initial;
    margin-bottom: 1rem;
`;

export const FormTitle = styled.p`
    text-align: center;
    padding-top: 2rem;
`;

export const Error = styled.p`
    color: #d32f2f;
    margin: 0;
`;
