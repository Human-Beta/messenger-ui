import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGOUT_USER_ACTION, useAppDispatch } from './redux/store';
import { getCurrentUser } from './redux/user/asyncActions';
import { getAccessToken } from './services/localStorage.service';
import { initSocketAndOpen } from './services/socket.service';

const RequireAuth: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isUserRetreived, setUserRetreived] = useState(false);

  useEffect(() => {
    const accessToken = getAccessToken();

    if (accessToken) {
      dispatch(getCurrentUser())
        .unwrap()
        .catch((err) => {
          // TODO: use logger instead
          console.log('Cannot get the current user: ', err);
        })
        .then(() => {
          initSocketAndOpen();

          setUserRetreived(true);
        });
    } else {
      dispatch(LOGOUT_USER_ACTION);
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return <>{isUserRetreived && children}</>;
};

export default RequireAuth;
