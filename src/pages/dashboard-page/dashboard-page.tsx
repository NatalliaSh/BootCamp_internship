import commonStyles from '../common-styles/common-styles.module.scss';
import {FC, useEffect, useState} from 'react';
import {useGetUserProfileQuery} from '../../api/endpoints';
import {Header} from '../../components/header';
import {useAppSelector} from '../../store/hooks/redux-hooks';
import {stateSelectors} from '../../store/store';
import {PageTitle} from '../../components/page-title';
import {Tabs} from '../../components/tabs';
import {DashboardContent} from '../../components/dashboard-content';
import {DashboardTable} from '../../components/dashboard-table';
import {useSearchParams} from 'react-router-dom';
import {dashboardSearchParams} from '../../constants';

const tabItems = [
  {id: 'content', title: 'Content', content: <DashboardContent />},
  {id: 'table', title: 'Table', content: <DashboardTable />},
];

export const DashboardPage: FC = () => {
  useGetUserProfileQuery();
  const {isLogged} = useAppSelector(stateSelectors.currentUserSliceData);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(tabItems[0].id);

  const onTabClick = (id: string) => {
    setSearchParams(`${dashboardSearchParams.content}=${id}`);
  };

  useEffect(() => {
    const currentParam = searchParams.get(dashboardSearchParams.content);
    if (currentParam && tabItems.some((tab) => tab.id === currentParam)) {
      setActiveTab(currentParam);

      // here if the content tab is active, we reset the additional query param related with table ID
      if (currentParam === tabItems[0].id) {
        searchParams.delete(dashboardSearchParams.tableID);
        setSearchParams(searchParams);
      }
    } else {
      setSearchParams(`${dashboardSearchParams.content}=${activeTab}`);
    }
  }, [searchParams, activeTab, setSearchParams]);

  return (
    <>
      {isLogged && (
        <>
          <Header />
          <div className={commonStyles.content}>
            <PageTitle title="Dashboard" />
            <Tabs
              tabItems={tabItems}
              activeTabID={activeTab}
              onClick={onTabClick}
            />
          </div>
        </>
      )}
    </>
  );
};
