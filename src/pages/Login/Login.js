import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from '../../firebase';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import styles from './Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [memberName, setMemberName] = useState('');

    const navigate = useNavigate();

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

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            console.error('로그인 에러:', error);
            alert('로그인을 다시 시도해주세요');
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigate('/');
        } catch (error) {
            console.error('Google 로그인 에러:', error);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginText}>로그인</div>
            <form className={styles.formContainer}>
                <input
                    className={styles.input}
                    type="email"
                    placeholder='이메일을 입력해주세요'
                    value={email}
                    onChange={handleEmailChange}
                    autoComplete="current-email" //autocomplete 속성은 브라우저에게 입력 필드의 자동 완성 기능을 사용하지 말아야 함을 알려줌
                />
                <input
                    className={styles.input}
                    type="password"
                    placeholder='비밀번호를 입력해주세요'
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete="current-password"
                />
            </form>
            <div className={styles.findAccount}>
                <div className={styles.findButton}>아이디 찾기</div>
                <span className={styles.line} />
                <div className={styles.findButton}>비밀번호 찾기</div>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.loginButton} onClick={handleLogin}>
                    로그인
                </button>
                <button className={styles.loginGoogleButton} onClick={handleGoogleLogin}>
                    Google 계정으로 로그인
                </button>
                <Link to="/signup">
                    <button className={styles.signUpButton}>
                        회원가입
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Login;