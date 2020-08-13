import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import withWidth from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';
import CurrencyFields from './currency-fields';
import CalculationFields from './calculator-fields';
import { useTranslation } from 'react-i18next';
import Requisites from './requisites';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

const stepStorageKey = process.env.REACT_APP_STAGE_STORAGE_KEY
const currencyStorageKey = process.env.REACT_APP_CURRENCY_STORAGE_KEY

function VerticalStepper(props) {
    const { t } = useTranslation();
    const classes = useStyles();
    const initStep = parseInt(localStorage.getItem(stepStorageKey), 10) || 0;
    const initCurrency = JSON.parse(localStorage.getItem(currencyStorageKey))
    const [activeStep, setActiveStep] = React.useState(initStep);


    const handleNext = () => {
        setActiveStep((prevActiveStep) => handleStepWithSave(prevActiveStep + 1));
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => handleStepWithSave(prevActiveStep - 1));
    };

    const handleStepWithSave = (value) => {
        localStorage.setItem("ExchangeStep", value);
        return value;
    }

    const getSteps = () => [
        {
            label: t("Common.Choose currency"),
            content: <CurrencyFields />
        },
        {
            label: t("Common.Exchange amount"),
            content: <CalculationFields />
        },
        {
            label: t("Common.Requisites"),
            content: <Requisites />
        }
    ]

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {
                    getSteps().map((elem, index) =>
                        <Step active={activeStep >= index}>
                            <StepLabel>{elem.label}</StepLabel>
                            <StepContent >
                                <Typography>
                                    {React.cloneElement(elem.content, {
                                        handleNext: handleNext,
                                        handleBack: handleBack,
                                        initCurrency: initCurrency,
                                        active: (activeStep === index),

                                    })}
                                </Typography>
                            </StepContent>
                        </Step>
                    )
                }
            </Stepper>
        </div >
    );
}

export default withWidth()(VerticalStepper);
