import React from 'react'
import { Button, makeStyles, Grid, TextField } from '@material-ui/core'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function Requisites(props) {
    const { t } = useTranslation();
    const classes = useStyles();
    const [state, setState] = React.useState({
        accounNumber: '',
        email: ''
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    return (
        <Grid container spacing={2} direction="row" justify="center" alignItems="stretch">
            <Grid item xs={12} sm={6}>
                <TextField required fullWidth label={t("BaseFields.Account number")} name="accounNumber" variant="outlined" value={state.accounNumber} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField required fullWidth label={t("BaseFields.Email Address")} name="email" variant="outlined" value={state.email} onChange={handleChange} />
            </Grid>
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
                    disabled={(!(state.accounNumber) || !(state.email))}
                    variant="contained"
                    color="primary"
                    // onClick={props.handleNext}
                    className={classes.button}
                >
                    {t("Buttons.Exchange")}
                </Button>
            </Grid>
            }
        </Grid>
    )
}
