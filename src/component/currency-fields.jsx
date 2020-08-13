import React from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, Button, makeStyles, ListItemIcon } from '@material-ui/core';
import { getGiveCyrrencyList, getTakeCyrrencyList } from "../utils/currency-list"
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {

    },
    listImage: {
        width: "25px",
        height: "25px"
    }
}));

const giveCurrencyItem = getGiveCyrrencyList()

const takeCurrencyItem = getTakeCyrrencyList()

const currencyStorageKey = process.env.REACT_APP_CURRENCY_STORAGE_KEY


export default function CurrencyFields(props) {
    const { t } = useTranslation();
    const classes = useStyles();
    const emptyState = {
        giveCurrency: '',
        takeCurrency: '',
    }
    const [state, setState] = React.useState(props.initCurrency || emptyState);

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    const onClearBtnClick = () => {
        setState(emptyState)
        localStorage.removeItem(currencyStorageKey)
    }

    const onNextBtnClick = () => {
        localStorage.setItem(currencyStorageKey, JSON.stringify(state))
        props.handleNext()
    }

    return (
        <Grid container spacing={2} direction="row" justify="center" alignItems="stretch">
            <Grid item xs={12} sm={6}>
                <FormControl required variant="outlined" fullWidth disabled={!props.active}>
                    <InputLabel id="outlined-giveCurrency-currency-label-required">{t("Common.Give currency")}</InputLabel>
                    <Select
                        labelId="outlined-giveCurrency-currency-label-required"
                        id="outlined-giveCurrency-currency-select"
                        value={state.giveCurrency}
                        onChange={handleChange}
                        label={t("Common.Give currency")}
                        inputProps={{
                            name: 'giveCurrency',
                            InputLabelProps: { shrink: true }
                        }}

                    >
                        {giveCurrencyItem.map((item) => (
                            < MenuItem key={item.key} value={item.key}  >
                                <ListItemIcon>
                                    <img className={classes.listImage} alt={item.value} src={item.imageUrl} />
                                </ListItemIcon>
                                {item.value}
                            </MenuItem>
                        ), this)}
                    </Select>

                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl required variant="outlined" fullWidth disabled={!props.active}>
                    <InputLabel tmlFor="outlined-takeCurrency-label">{t("Common.Take currency")}</InputLabel>
                    <Select
                        labelId="outlined-takeCurrency-label"
                        id="outlined-takeCurrency-select"
                        value={state.takeCurrency}
                        onChange={handleChange}
                        label={t("Common.Take currency")}
                        inputProps={{
                            name: 'takeCurrency',
                            InputLabelProps: { shrink: true }
                        }}

                    >
                        {takeCurrencyItem.map((item) => (
                            < MenuItem key={item.key} value={item.key} > 
                                <ListItemIcon>
                                    <img className={classes.listImage} alt={item.value} src={item.imageUrl} />
                                </ListItemIcon>
                                {item.value}
                            </MenuItem>
                        ), this)}
                    </Select>
                </FormControl>
            </Grid >
            {props.active && <Grid item xs={6} sm={3}>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => onClearBtnClick()}
                    className={classes.button}
                >
                    {t("Buttons.Clear")}
                </Button>
            </Grid>}
            {props.active && <Grid item xs={6} sm={3} >
                <Button
                    fullWidth
                    disabled={(!(state.giveCurrency) || !(state.takeCurrency))}
                    variant="contained"
                    color="primary"
                    onClick={() => onNextBtnClick()}
                    className={classes.button}
                >
                    {t("Buttons.Next")}
                </Button>
            </Grid >}
        </Grid >
    )
}