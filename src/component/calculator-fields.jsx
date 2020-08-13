import React from 'react';
import { Grid, makeStyles, Button } from '@material-ui/core';
import { getGiveCyrrencyList, getTakeCyrrencyList } from "../utils/currency-list"
import { useTranslation } from 'react-i18next';
import NumericField from './numeric-field';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
    },
}));

const giveCurrencyItems = getGiveCyrrencyList()

const takeCurrencyItems = getTakeCyrrencyList()

const amountStorageKey = process.env.REACT_APP_CURRENCY_STORAGE_KEY


export default function CalculationFields(props) {
    const { t } = useTranslation();
    const classes = useStyles();
    const initAmount = JSON.parse(localStorage.getItem(amountStorageKey))
    const [state, setState] = React.useState(initAmount || {
        giveAmount: '',
        takeAmount: ''
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    const getCurrencyNameByValue = (arr, id) => {
        return arr.find((elem) => elem.key === id)?.value
    }

    const onNextBtnClick = () => {
        localStorage.setItem(amountStorageKey, JSON.stringify(state))
        props.handleNext()
    }

    return (
        <Grid container spacing={2} direction="row" justify="center" alignItems="stretch">
            <Grid item xs={12} sm={6}>
                <NumericField required fullWidth disabled={!props.active} name="giveAmount" label={`${t("Common.Give currency")} (${getCurrencyNameByValue(giveCurrencyItems, props.initCurrency?.giveCurrency)})`} variant="outlined" value={state.giveAmount} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <NumericField required fullWidth disabled={!props.active} name="takeAmount" label={`${t("Common.Take currency")} (${getCurrencyNameByValue(takeCurrencyItems, props.initCurrency?.takeCurrency)})`} variant="outlined" value={state.takeAmount} onChange={handleChange} />
            </Grid >
            {props.active && <Grid item xs={6} sm={3}>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => props.handleBack()}
                    className={classes.button}
                >
                    {t("Buttons.Back")}
                </Button>
            </Grid >}
            {props.active && <Grid item xs={6} sm={3}>
                <Button
                    fullWidth
                    disabled={!(state.giveAmount) || !(state.takeAmount)}
                    variant="contained"
                    color="primary"
                    onClick={() => onNextBtnClick()}
                    className={classes.button}
                >
                    {t("Buttons.Next")}
                </Button>
            </Grid>}
        </Grid>
    )
}