import React from 'react';
import i18n from "i18next";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useTranslation } from "react-i18next";


export default function ChangeLanguageBtn() {
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  return (
    <div>
      <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
        <Button onClick={() => changeLanguage("ua")}>{t('Common.UA')}</Button>
        <Button onClick={() => changeLanguage("ru")}>{t('Common.RU')}</Button>
        <Button onClick={() => changeLanguage("en")}>{t('Common.EN')}</Button>
      </ButtonGroup>
    </div>
  )
}