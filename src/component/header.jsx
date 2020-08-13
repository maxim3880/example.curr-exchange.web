import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Grid, IconButton, Button } from "@material-ui/core";
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import LeftSwipeMenu from './left-swipe-menu';

const useStyles = makeStyles((theme) => ({

    title: {
        flexGrow: 1,
    },
}));

function Header(props) {
    const { t } = useTranslation();
    const classes = useStyles();

    const onClientButtonClick = (path) => {
        props.history.push(path)
    };

    return (

        <React.Fragment>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="stretch"
            >
                <AppBar position="static">
                    <Toolbar>

                        <Grid item xs={1}>
                            <LeftSwipeMenu />
                        </Grid>
                        <Grid item xs={10}>
                            <Button className={classes.title} onClick={() => onClientButtonClick("/")}>
                                <Typography variant="h6" >
                                    {t('Common.Exchange name')}
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton
                                edge="end"

                                onClick={() => onClientButtonClick("/signin")}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Grid>

                    </Toolbar>
                </AppBar >
            </Grid>
        </React.Fragment>
    )
}
export default withRouter(Header)