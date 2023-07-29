import styles from './Footer.module.css';
import React from 'react';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerContents}>
                    <div className={styles.footerCustomer}>
                        <h2 className={styles.footerCustomerTitle}>고객행복센터</h2>
                        <strong className={styles.strong}>0000-0000</strong>
                        <div className={styles.buttonWrapper}>
                            <button className={styles.footerButton}>카카오톡 문의</button>
                            <button className={styles.footerButton}>1:1 문의</button>
                            <button className={styles.footerButton}>대량주문 문의</button>
                        </div>
                        <div className={styles.mailto}>
                            비회원 문의: help@zerocorp.com
                            <br></br>
                            비회원 대량주문 문의: zerogift@zerocorp.com
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;