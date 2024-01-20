import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HeaderTop.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../store/userSlice';

const HeaderTop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const memberName = useSelector((state) => state.user.name); // Redux store에서 사용자 이름을 가져옴

  useEffect(() => {
    const auth = getAuth();

    const loginUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        const displayName = user.displayName;
        if (displayName) {
          dispatch(setName(displayName)); // Redux store에 사용자 이름을 업데이트하는 액션 디스패치
        }
        console.log(displayName);
      } else {
        dispatch(setName('')); // 로그아웃 시 사용자 이름을 초기화
      }
    });

    return () => loginUser();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.headerTop}>
      {memberName ? (
        <>
          <p className={styles.memberName}>{memberName}님</p>
          <p className={styles.logoutText} onClick={handleLogout}>
            로그아웃
          </p>
        </>
      ) : (
        <>
          <p
            className={styles.signUpText}
            onClick={() => {
              navigate(`/signup`);
            }}
          >
            회원가입
          </p>
          <p
            className={styles.loginText}
            onClick={() => {
              navigate(`/login`);
            }}
          >
            로그인
          </p>
        </>
      )}
      <p className={styles.csCenterText}>고객센터</p>
    </div>
  );
};

export default HeaderTop;
