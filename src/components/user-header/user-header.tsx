import styles from './user-header.module.scss';
import {FC, useState} from 'react';
import {stateSelectors} from '../../store/store';
import {useAppSelector} from '../../store/hooks/redux-hooks';
import {UserIcon} from '../icon-components/user-icon';
import {LogoutIcon} from '../icon-components/logout-icon';
import {NavLink} from 'react-router-dom';
import {ROUTE_PATH} from '../../routes/routes-paths';
import {ActivityPopUp} from '../activity-pop-up';
import {useLogoutMutation} from '../../api/endpoints';

export const UserHeader: FC = () => {
  const CurrentUserDataState = useAppSelector(
    stateSelectors.currentUserSliceData,
  );
  const [isShowMenu, setShowMenu] = useState(false);
  const [serverLogout] = useLogoutMutation();

  return (
    <div className={styles.wrapper}>
      <div
        className={styles['button-container']}
        onClick={() => setShowMenu(!isShowMenu)}
        role="button"
        data-target-id="user-header"
      >
        <div className={styles['user-data']}>
          <p className={styles['user-data__name']}>
            {CurrentUserDataState.firstName +
              ' ' +
              CurrentUserDataState.lastName}
          </p>
          <p className={styles['user-data__status']}>
            {CurrentUserDataState.role}
          </p>
        </div>
        <div className={styles['logo-wrapper']}>
          <UserIcon />
        </div>
      </div>

      {isShowMenu && (
        <div
          className={styles['pop-up-wrapper']}
          onClick={() => setShowMenu(!isShowMenu)}
          data-target-id="user-header"
        >
          <ActivityPopUp id="user-header" onClose={() => setShowMenu(false)}>
            <>
              <NavLink to={ROUTE_PATH.profile}>
                <UserIcon className={styles.icon} />
                Profile
              </NavLink>
              <button type="button" onClick={() => serverLogout()}>
                <LogoutIcon className={styles.icon} />
                Log Out
              </button>
            </>
          </ActivityPopUp>
        </div>
      )}
    </div>
  );
};
