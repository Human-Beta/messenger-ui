import { FC, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { PAGE_SIZE } from '..';
import { Status } from '../../../@types/status';
import { findNextChats } from '../../../redux/search/asyncActions';
import { getChatsStatus, getFoundChats, getSearchValue } from '../../../redux/search/selectors';
import { useAppDispatch } from '../../../redux/store';
import { extractChatName } from '../../../utils/search.utils';
import styles from '../Search.module.scss';
import SearchChat from '../SearchChat';

const SearchChats: FC = () => {
  const dispatch = useAppDispatch();

  const chats = useSelector(getFoundChats);
  const value = useSelector(getSearchValue);
  const status = useSelector(getChatsStatus);

  const loadNextChats = useCallback(
    (inView: boolean) => {
      const name = extractChatName(value);
      if (inView && name) {
        dispatch(findNextChats({ name, size: PAGE_SIZE }));
      }
    },
    [dispatch, value],
  );

  const [loadTriggerRef] = useInView({
    onChange: loadNextChats,
  });

  if (!chats || !chats.length) {
    return <></>;
  }

  return (
    <div className={`${styles.chats}`}>
      <div className={`${styles.search_label} unselectable`}>Chats</div>
      {chats.map((chat) => (
        <SearchChat key={chat.id} chat={chat} />
      ))}
      {status !== Status.FULL_LOADED && (
        <div ref={loadTriggerRef} className={styles['load-trigger']} />
      )}
    </div>
  );
};

export default SearchChats;
