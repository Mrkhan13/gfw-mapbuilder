import * as React from 'react';
import InfoTabView from './InfoTabView';
import LayerTabView from './LayersTabView';
import DataTabView from './DataTabView';
import MeasurementTabView from './MeasurementTabView';
import AnalysisTabView from './AnalysisTabView';
import DocumentsTabView from './DocumentsTabView';

interface TabViewRender {
  label: string;
  icon: React.SFC<React.SVGProps<SVGSVGElement>>;
  tooltipText: string;
  render: boolean;
}

//TODO: We need to figure out how to integrate Typescript, Component Props and Redux
interface TabViewContainerProps {
  tabViewsToRender: Array<TabViewRender>;
}

class TabViewContainer extends React.Component<TabViewContainerProps, {}> {
  render(): JSX.Element[] {
    const TabViews = this.props.tabViewsToRender.map(
      (tabView: TabViewRender) => {
        switch (tabView.label) {
          case 'info':
            return <InfoTabView label={tabView.label} key={tabView.label} />;
          case 'layers':
            return <LayerTabView label={tabView.label} key={tabView.label} />;
          case 'data':
            return <DataTabView label={tabView.label} key={tabView.label} />;
          case 'measurement':
            return (
              <MeasurementTabView label={tabView.label} key={tabView.label} />
            );
          case 'analysis':
            return (
              <AnalysisTabView label={tabView.label} key={tabView.label} />
            );
          case 'documents':
            return (
              <DocumentsTabView label={tabView.label} key={tabView.label} />
            );
          default:
            break;
        }
      }
    );
    return TabViews;
  }
}

export default TabViewContainer;
