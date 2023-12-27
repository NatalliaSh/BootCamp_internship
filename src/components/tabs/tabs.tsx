import classNames from 'classnames';
import styles from './tabs.module.scss';
import {FC, ReactNode, useTransition} from 'react';
import {TabsTypes} from './types';

type TabsProps = {
  tabItems: {
    id: string;
    title: string;
    content: ReactNode;
  }[];
  activeTabID: string;
  onClick: (tabID: string) => void;
  type?: TabsTypes;
};

export const Tabs: FC<TabsProps> = ({
  tabItems,
  onClick,
  activeTabID,
  type = TabsTypes.Default,
}) => {
  const [, startTransition] = useTransition();

  return (
    <>
      <div
        className={classNames({
          [styles['tabs-default']]: type === TabsTypes.Default,
          [styles['tabs-table']]: type === TabsTypes.Table,
        })}
      >
        {tabItems.map(({id, title}) => (
          <div
            key={id}
            onClick={() => startTransition(() => onClick(id))}
            className={classNames(styles['tab-title'], {
              [styles['tab-title-active']]: id === activeTabID,
            })}
          >
            {title}
          </div>
        ))}
      </div>
      {tabItems.find(({id}) => id === activeTabID)?.content}
    </>
  );
};
