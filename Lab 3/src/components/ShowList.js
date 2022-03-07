import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchShows from "./SearchShows";
import noImage from "../img/download.jpeg";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    makeStyles,
    Button,
} from "@material-ui/core";

import "../App.css";
const useStyles = makeStyles({
    card: {
        maxWidth: 250,
        height: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 5,
        border: "1px solid #1e8678",
        boxShadow:
            "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
    },
    titleHead: {
        borderBottom: "1px solid #1e8678",
        fontWeight: "bold",
    },
    grid: {
        flexGrow: 1,
        flexDirection: "row",
    },
    media: {
        height: "100%",
        width: "100%",
    },
    button: {
        color: "#1e8678",
        fontWeight: "bold",
        fontSize: 12,
    },
});
const ShowList = (props) => {
    const propsPageNumber = parseInt(props.match.params.pageNumber);
    const regex = /(<([^>]+)>)/gi;
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [searchData, setSearchData] = useState(undefined);
    const [showsData, setShowsData] = useState(undefined);
    const [searchTerm, setSearchTerm] = useState("");
    const [pageNumber, setPageNumber] = useState(
        isNaN(propsPageNumber) ? 0 : propsPageNumber
    );
    const [isPageUsed, setIsPageUsed] = useState(
        propsPageNumber ? true : false
    );
    const [isLastPage, setIsLastPage] = useState(false);
    const [isFirstPage, setIsFirstPage] = useState(
        pageNumber < 1 ? true : false
    );
    const [isError, setIsError] = useState(false);

    let card = null;
    const API_URL = "http://api.tvmaze.com/shows";

    useEffect(() => {
        if (isPageUsed) {
            return;
        }

        async function fetchData() {
            try {
                const { data } = await axios.get("http://api.tvmaze.com/shows");
                setShowsData(data);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get(
                    "http://api.tvmaze.com/search/shows?q=" + searchTerm
                );
                setSearchData(data);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        if (searchTerm) {
            fetchData();
        }
    }, [searchTerm]);

    async function getCurrentPageData() {
        const pageData = await getPageData(pageNumber);

        setLoading(false);
        if (pageData) {
            setShowsData(pageData);
        } else {
            setIsError(true);
        }
    }

    async function getNextPageData() {
        const pageData = await getPageData(pageNumber + 1);

        pageData ? setIsLastPage(false) : setIsLastPage(true);
    }

    async function getPageData(pageNumber) {
        try {
            const { data } = await axios.get(`${API_URL}?page=${pageNumber}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!isPageUsed) {
            return;
        }

        getCurrentPageData();
        getNextPageData();
    }, [isPageUsed, pageNumber]);

    const searchValue = async (value) => {
        setSearchTerm(value);
    };
    const buildCard = (show) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={show.id}>
                <Card className={classes.card} variant="outlined">
                    <CardActionArea>
                        <Link to={`/shows/${show.id}`}>
                            <CardMedia
                                className={classes.media}
                                component="img"
                                image={
                                    show.image && show.image.original
                                        ? show.image.original
                                        : noImage
                                }
                                title="show image"
                            />

                            <CardContent>
                                <Typography
                                    className={classes.titleHead}
                                    gutterBottom
                                    variant="h6"
                                    component="h3"
                                >
                                    {show.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    {show.summary
                                        ? show.summary
                                              .replace(regex, "")
                                              .substring(0, 139) + "..."
                                        : "No Summary"}
                                    <span>More Info</span>
                                </Typography>
                            </CardContent>
                        </Link>
                    </CardActionArea>
                </Card>
            </Grid>
        );
    };

    function previousHandler() {
        setPageNumber(pageNumber - 1);
        pageNumber > 1 ? setIsFirstPage(false) : setIsFirstPage(true);
        setIsPageUsed(true);
    }

    function nextHandler() {
        setPageNumber(pageNumber + 1);
        pageNumber >= 0 ? setIsFirstPage(false) : setIsFirstPage(true);
        setIsPageUsed(true);
    }

    if (searchTerm) {
        card =
            searchData &&
            searchData.map((shows) => {
                let { show } = shows;
                return buildCard(show);
            });
    } else {
        card =
            showsData &&
            showsData.map((show) => {
                return buildCard(show);
            });
    }

    if (isError) {
        return (
            <div>
                <h2>404 Not Found</h2>
            </div>
        );
    }

    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
    } else {
        return (
            <div>
                <SearchShows searchValue={searchValue} />
                <br />
                <br />
                {!isFirstPage && (
                    <Button
                        component={Link}
                        to={`/shows/page/${pageNumber - 1}`}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={previousHandler}
                    >
                        Previous Page
                    </Button>
                )}{" "}
                {!isLastPage && (
                    <Button
                        component={Link}
                        to={`/shows/page/${pageNumber + 1}`}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={nextHandler}
                    >
                        Next Page
                    </Button>
                )}
                <br />
                <br />
                <Grid container className={classes.grid} spacing={5}>
                    {card}
                </Grid>
            </div>
        );
    }
};

export default ShowList;
