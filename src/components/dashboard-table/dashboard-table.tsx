import styles from './dashboard-table.module.scss';
import {FC, useState, useEffect} from 'react';
import {FullDataContent} from '../full-data-content';
import {Tabs} from '../tabs';
import {TabsTypes} from '../tabs/types';
import {FunnelChartContent} from '../funnel-chart-content';
import {ProjectsContent} from '../projects-content';
import {useSearchParams} from 'react-router-dom';
import {dashboardSearchParams} from '../../constants';

const tabItems = [
  {id: 'fullData', title: 'Full data', content: <FullDataContent />},
  {id: 'funnelChart', title: 'Funnel chart', content: <FunnelChartContent />},
  {id: 'projects', title: 'Projects', content: <ProjectsContent />},
];

export const DashboardTable: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTabId, setActiveTabID] = useState(tabItems[0].id);

  const onTabClick = (id: string) => {
    setSearchParams({...searchParams, [dashboardSearchParams.tableID]: id});
  };

  useEffect(() => {
    const currentParam = searchParams.get(dashboardSearchParams.tableID);
    if (currentParam && tabItems.some((tab) => tab.id === currentParam)) {
      setActiveTabID(currentParam);
    } else {
      searchParams.set(dashboardSearchParams.tableID, activeTabId);
      setSearchParams(searchParams);
    }
  }, [searchParams, activeTabId, setSearchParams]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Tabs
          tabItems={tabItems}
          activeTabID={activeTabId}
          onClick={onTabClick}
          type={TabsTypes.Table}
        />
      </div>
    </div>
  );
};
