import { useRouter } from 'next/router';
import { signOut } from '../lib/auth';
import styles from '../styles/components/DashboardHeader.module.scss';

export default function DashboardHeader() {
  const router = useRouter();
  
  return (
    <header className={styles.dashboardHeaderContainer}>
      <h1>Dashboard</h1>
      <div onClick={() => signOut(router)}>
        <i className="fas fa-sign-out-alt"></i>
        Sign out
      </div>
    </header>
  )
}