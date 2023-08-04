import styles from './layout.module.css';
import Link from 'next/link';

export default function Layout({ children }) {
  return <div className={styles.wrapper}>
    <div className={styles.test}>
      <div className={styles.navContainer}>
        {/* <Link className={styles.customLink} href="/">Home</Link> */}
        {/* <Link className={styles.customLink} href="/about">About</Link> */}
        {/* <Link className={styles.customLink} href="/contacts">Contacts</Link> */}
        {/* <Link className={styles.customLink} href="/weather">Pronóstico del clima</Link> */}
      </div>
      <div className={styles.container}>
        {children}
      </div>
    </div>
    {/* <footer className={styles.footer}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <img src="/vercel.svg" alt="Vercel" />
      </a>
    </footer> */}
  </div>;
}