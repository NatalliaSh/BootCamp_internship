import styles from './header.module.scss';
import {NavLink} from 'react-router-dom';
import {LogoIcon} from '../icon-components/logo-icon';
import {UserHeader} from '../user-header';
import {useAppSelector} from '../../store/hooks/redux-hooks';
import {stateSelectors} from '../../store/store';
import {userRoles} from '../../constants';
import {ROUTE_PATH} from '../../routes/routes-paths';
import {FC} from 'react';

export const Header: FC = () => {
  const {role} = useAppSelector(stateSelectors.currentUserSliceData);
  const isSuperAdmin = role === userRoles.superAdmin;
  const getLinkClass = ({isActive}: {isActive: boolean}) =>
    isActive ? styles['page-link_active'] : styles['page-link'];

  return (
    <header className={styles.header}>
      <div>
        <LogoIcon />
      </div>
      <div className={styles.wrapper}>
        <nav className={styles.navigation}>
          <NavLink to={ROUTE_PATH.bootcampLife} className={getLinkClass}>
            Bootcamp Life
          </NavLink>
          <NavLink to={ROUTE_PATH.dashboard} className={getLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to={ROUTE_PATH.mentors} className={getLinkClass}>
            Mentors
          </NavLink>
          <NavLink to={ROUTE_PATH.projects} className={getLinkClass}>
            Projects
          </NavLink>
          {isSuperAdmin && (
            <NavLink to={ROUTE_PATH.users} className={getLinkClass}>
              Users
            </NavLink>
          )}
        </nav>
        <UserHeader />
      </div>
    </header>
  );
};
