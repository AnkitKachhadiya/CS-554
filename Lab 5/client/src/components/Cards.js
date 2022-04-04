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

function Cards({ data }) {
    return (
        <CardContainer>
            {data.map((image) => (
                <Card key={image.id}>
                    <ImageContainer>
                        <Image src={image.url} alt={image.description} />
                    </ImageContainer>

                    <CardBody>
                        <CardText>
                            {image.description && <p>{image.description}</p>}
                            <p>
                                An image by:<strong> {image.posterName}</strong>
                            </p>
                        </CardText>
                        <CardButton>
                            <StyledButton>Add to bin</StyledButton>
                        </CardButton>
                    </CardBody>
                </Card>
            ))}
        </CardContainer>
    );
}

export default Cards;
