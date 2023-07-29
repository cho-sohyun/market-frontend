import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css';
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';

const Signup = () => {
    const [values, setValues] = useState({
        userEmail: '',
        password: '',
        passwordCheck: '',
        name: '',
    });

    const [isEmailValid, setIsEmailValid] = useState(true); // 이메일 중복 여부 저장

    const navigate = useNavigate();

    const valueHandler = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });    
    };

    const {
        userEmail,
        password,
        passwordCheck,
        name,
    } = values;

    // 비밀번호 정규식 패턴 의미이며, 영문 대소문자, 숫자, 특수문자 포함 9자 이상
    const passwordRegEx =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{9,})/;

    // 정규식 패턴을 만족하는지 검사하며, 만족하는 경우 true를 반환
    const isPasswordValid = passwordRegEx.test(password);

    const isPasswordCheck = password === passwordCheck;

    // 입력된 이름이 비어있지 않은 경우 true 반환
    const isNameValid = name.length > 0;


    // 폼에서 필수입력 사항들이 모두 존재하는 경우 true 반환
    const isSubmitValid =
        password && passwordCheck && name;

        const handleEmailCheck = async () => {
            try {
                const auth = getAuth();
                const signInMethods = await fetchSignInMethodsForEmail(auth, userEmail);

                //ignInMethods 배열의 길이가 0보다 크다면 이미 가입된 이메일이므로 중복된 이메일로 처리
                const isDuplicate = signInMethods.length > 0;

                if (isDuplicate) {
                    alert('중복된 이메일 입니다.')
                } else {
                    alert('사용 가능한 이메일 입니다.')
                }
            } catch (error) {
                console.error('이메일이 중복 확인 에러', error);
                alert('다시 시도해주세요.'); 
            }
        };

    const signupSubmit = async (e) => {
        e.preventDefault(); // 이벤트의 기본 동작을 중지, 폼 제출 시 페이지가 새로고침되는 동작을 막는다.
        if (isSubmitValid && isEmailValid) {
            try {
                const auth = getAuth();
                await createUserWithEmailAndPassword(auth, userEmail, password);
                alert('마켓제로에 오신걸 환영합니다!');
                navigate('/login');
            } catch (error) {
                console.error('에러', error);
                alert('다시 시도해주세요'); 
            } 
        } else {
            alert('필수 입력 정보를 확인해주세요.');
        }
    };

    return (
        <div className={styles.signup}>
            <div className={styles.signupContainer}>
                <div className={styles.signupTitle}>회원가입</div>
                <div className={styles.required}>
                    <span className={styles.requiredSymbol}>*</span>필수입력사항
                </div>

                <div className={styles.userFormContainer}>
                    <span className={styles.infoContainer}>아이디
                        <span className={styles.requiredSymbol}>*</span>
                    </span>
                    <div className={styles.inputContainer}>
                            <input 
                                className={styles.input}
                                name="userEmail"
                                type="email"
                                placeholder="이메일을 입력해주세요"
                                onChange={valueHandler}
                            />
                    </div>
                    <button
                        className={styles.duplicateButton}
                        onClick={handleEmailCheck}
                    >
                        <span className={styles.duplicateButtonText}>중복확인</span>
                    </button>
                </div>

                <div className={styles.userFormContainer}>
                    <span className={styles.infoContainer}>비밀번호
                        <span className={styles.requiredSymbol}>*</span>
                    </span>
                    <div className={styles.inputContainer}>
                            <input 
                                className={styles.input}
                                name="password"
                                type="password"
                                placeholder="비밀번호를 입력해주세요"
                                onChange={valueHandler}
                            />
                            {password.length !== 0 && (
                                <>
                                {!isPasswordValid && (
                                    <span className={styles.inputAlertText}>
                                        영문,숫자,특수문자를 모두 포함하여 9자 이상 입력해주세요.
                                    </span>
                                )}
                                </>
                            )}
                    </div>
                </div>

                <div className={styles.userFormContainer}>
                    <span className={styles.infoContainer}>비밀번호확인
                        <span className={styles.requiredSymbol}>*</span>
                    </span>
                    <div className={styles.inputContainer}>
                            <input 
                                className={styles.input}
                                name="passwordCheck"
                                type="password"
                                placeholder="비밀번호를 한번 더 입력해주세요"
                                onChange={valueHandler}
                            />

                            {password.length !== 0 && (
                                <>
                                {!isPasswordValid && (
                                    <span className={styles.inputAlertText}>
                                        동일한 비밀번호를 입력해주세요.
                                    </span>
                                )}
                                </>
                            )}
                    </div>
                </div>

                <div className={styles.userFormContainer}>
                    <span className={styles.infoContainer}>이름
                        <span className={styles.requiredSymbol}>*</span>
                    </span>
                    <div className={styles.inputContainer}>
                            <input 
                                className={styles.input}
                                name="name"
                                placeholder="이름을 입력해주세요"
                                onChange={valueHandler}
                            />

                            {name.length !== 0 && (
                                <>
                                {!isNameValid && (
                                    <span className={styles.inputAlertText}>
                                        이름을 입력해주세요.
                                    </span>
                                )}
                                </>
                            )}
                    </div>
                </div>

                <div className={styles.signupSubmit}>
                    <button 
                    className={styles.submitButton}
                    onClick={signupSubmit}
                    >
                        <span className={styles.submitButtonText}>가입하기</span>
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Signup;