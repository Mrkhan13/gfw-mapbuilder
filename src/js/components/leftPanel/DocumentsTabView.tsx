import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';

interface Props {
  key: string;
  label: string;
}

const DocumentsTabView = (props: Props): JSX.Element => {
  const { activeTab, tabViewVisible } = useSelector(
    (store: RootState) => store.appState.leftPanel
  );

  const tabViewIsVisible = tabViewVisible && activeTab === props.label;
  return <>{tabViewIsVisible && <div>Documents Tab View</div>}</>;
};

export default DocumentsTabView;
