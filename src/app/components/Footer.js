import Link from 'next/link';
import styles from './Footer.module.css'; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <nav>
        <ul>
          <li><Link href="/donor-search">Donor Search</Link></li>
          <li><Link href="/notifications">Notifications</Link></li>
          <li><Link href="/donation-tracking">Donation Tracking</Link></li>
          <li><Link href="/profile">Profile</Link></li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
