import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import StorefrontIcon from '@material-ui/icons/Storefront';
import ContactsIcon from '@material-ui/icons/Contacts';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import { useTranslation } from 'react-i18next';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton, Grid } from '@material-ui/core';
import ChangeLanguageBtn from './change-lng-btn';

const useStyles = makeStyles({
    list: {
        width: 250,
        height: "100vh"
    },
    fullList: {
        width: 'auto',
    },
});

export default function LeftSwipeMenu() {
    const { t } = useTranslation();
    const anchor = "left";
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,

    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (

        <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Grid item>
                <List>
                    <ListItem button key={t("Common.Main")}>
                        <ListItemIcon><StorefrontIcon /></ListItemIcon>
                        <ListItemText primary={t("Common.Main")} />
                    </ListItem>
                </List>
                <List>
                    <ListItem button key={t("Common.Contacts")}>
                        <ListItemIcon><ContactsIcon /></ListItemIcon>
                        <ListItemText primary={t("Common.Contacts")} />
                    </ListItem>
                </List>
                <List>
                    <ListItem button key={t("Common.Contacts")}>
                        <ListItemIcon><FormatAlignRightIcon /></ListItemIcon>
                        <ListItemText primary={t("Common.Agreements")} />
                    </ListItem>
                </List>
                
            </Grid>
            <Grid item>
                <List>
                    <ChangeLanguageBtn />
                </List>
            </Grid>
        </Grid>

    )

    return (
        <React.Fragment key={anchor}>
            <IconButton edge="start" onClick={toggleDrawer(anchor, true)} className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
            >
                {list(anchor)}
            </SwipeableDrawer>
        </React.Fragment>

    )
}