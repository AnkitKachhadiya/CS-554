import { Pagination, Grid } from "@mui/material";

function PaginationComponent({ totalPages, currentPage, changeHandler }) {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="mb-5 mt-2"
        >
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={changeHandler}
                color="primary"
                size="medium"
            />
        </Grid>
    );
}

export default PaginationComponent;
