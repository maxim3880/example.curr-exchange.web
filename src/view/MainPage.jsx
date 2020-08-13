import React from "react";
import Container from '@material-ui/core/Container';
import VerticalStepper from "../component/vertical-stepper";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        height: "auto"
    }
}));

export default function MainPage() {
    const classes = useStyles();
    return (

        <Container className={classes.container} component="main" >
            <VerticalStepper />
        </Container>

    )
}