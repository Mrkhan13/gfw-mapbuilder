import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';
import BaseAnalysis from 'js/components/leftPanel/BaseAnalysis';

interface Props {
  key: string;
  label: string;
}

interface TabProps {
  key: string;
  label: string;
}

const AnalysisTabView = (props: Props) => {
  const { activeTab, tabViewVisible } = useSelector(
    (store: RootState) => store.appState.leftPanel
  );

  const tabViewIsVisible = tabViewVisible && activeTab === props.label;
  return tabViewIsVisible ? <BaseAnalysis /> : null;
};

export default AnalysisTabView;
