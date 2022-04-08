import { StyledInput, FormControl } from "./styles/Card.styled";
import { useState } from "react";
import {
    Card,
    CardContainer,
    StyledButton,
    InputContainer,
    FormTitle,
    Error,
} from "./styles/Card.styled";

function NewPost() {
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [errors, setErrors] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        console.log(description);
        console.log(imageUrl);
        console.log(authorName);

        let errors = "";

        if (imageUrl.length < 1) {
            errors += `  Image URL is required.`;
        }

        if (!isValidUrl(imageUrl)) {
            errors += `  Image URL should be valid URL.`;
        }

        if (authorName.length < 1) {
            errors += `  Author Name is required.`;
        }

        setErrors(errors);
    }

    function isValidUrl(string) {
        try {
            new URL(string);
        } catch (error) {
            return false;
        }
        return true;
    }

    return (
        <>
            <CardContainer>
                <Card>
                    <FormTitle>
                        <strong>Create a Post</strong>
                    </FormTitle>
                    <InputContainer>
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <FormControl>
                                <label htmlFor="description">
                                    Description :
                                </label>
                                <StyledInput
                                    type="text"
                                    id="description"
                                    onChange={(event) =>
                                        setDescription(
                                            event.target.value.trim()
                                        )
                                    }
                                />
                            </FormControl>

                            <FormControl>
                                <label htmlFor="image-url">Image URL* : </label>
                                <StyledInput
                                    type="text"
                                    id="image-url"
                                    required="required"
                                    onChange={(event) =>
                                        setImageUrl(event.target.value.trim())
                                    }
                                />
                            </FormControl>

                            <FormControl>
                                <label htmlFor="author-name">
                                    Author Name* :
                                </label>
                                <StyledInput
                                    type="text"
                                    id="author-name"
                                    required="required"
                                    onChange={(event) =>
                                        setAuthorName(event.target.value.trim())
                                    }
                                />
                            </FormControl>

                            {errors.length > 0 && (
                                <Error>Error: {errors}</Error>
                            )}

                            <StyledButton type="submit">Submit</StyledButton>
                        </form>
                    </InputContainer>
                </Card>
            </CardContainer>
        </>
    );
}

export default NewPost;
