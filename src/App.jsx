import React from 'react';
import detector from "i18next-browser-languagedetector";
import Header from "./component/header"
import SignIn from "./view/auth/SignIn";
import SignUp from "./view/auth/SignUp";
import MainPage from "./view/MainPage"
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./localization/en.json"
import ua from "./localization/ua.json"
import ru from "./localization/ru.json"
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Footer from './component/footer';
import { Grid } from '@material-ui/core';

const resources = {
  en: {
    translation: en
  },
  ua: {
    translation: ua
  },
  ru: {
    translation: ru
  }
}

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: resources,
    languages: ["en", "ua", "ru"],
    fallbackLng: "ua",

    interpolation: {
      escapeValue: false
    }
  });

function App() {
  return (
    <Grid container direction="column" justify="space-between" alignItems="stretch">

      <Router>
        <Grid item>
          <Header />
        </Grid>
        <Switch>
          <Grid item>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
          </Grid>
        </Switch>
        <Grid item>
          <Footer />
        </Grid>
      </Router>
    </Grid>
  );
}

export default App;
