import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store/index';
import { getShareableURL } from 'js/helpers/shareFunctionality';
import 'css/printButton.scss';

const printReportTranslations = {
  fr: 'Imprimer le Rapport',
  es: 'Imprimir Informe',
  pt: 'Imprimir Relatóro',
  id: 'Print Report',
  zh: '打印报告',
  en: 'Print Report',
  ka: 'ანგარიშის ბეჭდვა'
};

export const PrintReportButton = (): JSX.Element => {
  const selectedLanguage = useSelector(
    (store: RootState) => store.appState.selectedLanguage
  );

  async function printReportHandler(): Promise<void> {
    const appID = new URL(window.location.href).searchParams.get('appid');
    //Get the base and state urls
    const baseUrl = new URL(window.location.href);
    const stateUrl = await getShareableURL({ report: true });
    const urlVal = appID
      ? `${baseUrl.href}&${stateUrl}`
      : `${baseUrl}?${stateUrl}`;
    window.open(urlVal);
  }

  return (
    <button className="print-button" onClick={printReportHandler}>
      {printReportTranslations[selectedLanguage]}{' '}
      <img src="https://my.gfw-mapbuilder.org/img/print-icon.svg" alt="print" />
    </button>
  );
};
