import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getSearchBy } from '../../../redux/search/selectors';
import { SearchBy } from '../../../redux/search/types';
import styles from '../Search.module.scss';

const SearchMessages: FC = () => {
  const searchBy = useSelector(getSearchBy);

  return (
    <>
      {searchBy === SearchBy.CHATS_AND_MESSAGES && (
        <div className={styles.search_label}>Messages</div>
      )}
    </>
  );
};

export default SearchMessages;
