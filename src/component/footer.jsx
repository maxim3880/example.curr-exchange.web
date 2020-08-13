import React from "react"
import { Box, Typography, Link, makeStyles, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "s",
        bottom: 0,
        right: "50%",
    }
}));
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    const classes = useStyles();
    return (
        <Container className={classes.root}>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    )
}