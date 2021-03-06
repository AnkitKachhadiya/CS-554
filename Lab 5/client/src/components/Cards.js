import {
    Card,
    ImageContainer,
    Image,
    CardBody,
    CardContainer,
    CardText,
    CardButton,
    StyledButton,
} from "./styles/Card.styled";

function Cards({
    data,
    handleAddToBin,
    handleRemoveFromBin,
    handleDeletePost,
    showDelete,
    mostPopular,
}) {
    return (
        <CardContainer>
            {data.map((image) => (
                <Card key={image.id}>
                    <ImageContainer>
                        <Image
                            src={image.url}
                            alt={
                                !image.description ||
                                image.description.length < 1
                                    ? "Binterest Image"
                                    : image.description
                            }
                            onError={(event) =>
                                (event.target.src = "./page-not-found.png")
                            }
                        />
                    </ImageContainer>

                    <CardBody>
                        <CardText>
                            {image.description && <p>{image.description}</p>}
                            <p>
                                An image by:<strong> {image.posterName}</strong>
                            </p>
                        </CardText>
                        {!mostPopular && (
                            <CardButton>
                                {image.binned ? (
                                    <StyledButton
                                        bg="#424242"
                                        onClick={() =>
                                            handleRemoveFromBin(image.id)
                                        }
                                    >
                                        Remove from bin
                                    </StyledButton>
                                ) : (
                                    <StyledButton
                                        onClick={() => handleAddToBin(image.id)}
                                    >
                                        Add to bin
                                    </StyledButton>
                                )}
                                {showDelete && image.userPosted && (
                                    <StyledButton
                                        bg="#795548"
                                        onClick={() =>
                                            handleDeletePost(image.id)
                                        }
                                    >
                                        Delete Post
                                    </StyledButton>
                                )}
                            </CardButton>
                        )}
                    </CardBody>
                </Card>
            ))}
        </CardContainer>
    );
}

export default Cards;
