import { FC, useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { PAGE_SIZE } from '..';
import { Status } from '../../../@types/status';
import { findInitUnknownUsers, findNextUnknownUsers } from '../../../redux/search/asyncActions';
import {
  getInitUnknownUsersStatus,
  getNextUnknownUsersStatus,
  getSearchValue,
  getUnknownUsers,
} from '../../../redux/search/selectors';
import { useAppDispatch } from '../../../redux/store';
import { extractSearchValue } from '../../../utils/search.utils';

import styles from '../Search.module.scss';
import SearchUnknownUser from '../SearchChat/SearchUnknownUser';

const SearchUnknownUsers: FC = () => {
  const dispatch = useAppDispatch();

  const value = useSelector(getSearchValue);
  const users = useSelector(getUnknownUsers);
  const initStatus = useSelector(getInitUnknownUsersStatus);
  const status = useSelector(getNextUnknownUsersStatus);

  const loadUnknownUsers = useCallback(
    (action: any) => {
      const nickname = extractSearchValue(value);

      if (nickname) {
        dispatch(action({ nickname, size: PAGE_SIZE }));
      }
    },
    [dispatch, value],
  );

  const [loadTriggerRef] = useInView({
    onChange: (inView: boolean) => {
      if (!inView) {
        return;
      }

      loadUnknownUsers(findNextUnknownUsers);
    },
  });

  useEffect(() => {
    if (initStatus === Status.INITIAL) {
      loadUnknownUsers(findInitUnknownUsers);
    }
  }, [loadUnknownUsers, initStatus]);

  return (
    <div className={styles.chats}>
      <div className={`${styles.search_label} unselectable`}>Unknown users</div>
      {initStatus >= Status.SUCCESS &&
        users.map((user) => <SearchUnknownUser key={user.id} {...user} />)}
      {initStatus === Status.SUCCESS && status !== Status.FULL_LOADED && (
        <div ref={loadTriggerRef} className={styles['load-trigger']} />
      )}
    </div>
  );
};

export default SearchUnknownUsers;
