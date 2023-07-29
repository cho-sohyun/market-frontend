import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HeaderTop.module.css';

const HeaderTop = () => {
    const navigate = useNavigate();
    const [memberName, setMemberName] = useState('');

    useEffect(() => {
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const displayName = user.displayName;
                if (displayName) {
                    setMemberName(displayName);
                }
            } else {
                setMemberName('');
            }
        });
    }, []);

    const handleLogout = async () => {
        try {
            const auth = getAuth();
            await signOut(auth);
            navigate(`/`);
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
                        }}>
                        회원가입
                    </p>
                    <p 
                        className={styles.loginText} 
                        onClick={() => {
                            navigate(`/login`);
                        }}>
                        로그인
                    </p>
                </>
            )}
            <p className={styles.csCenterText}>고객센터</p>
        </div>
    );
};

export default HeaderTop;
