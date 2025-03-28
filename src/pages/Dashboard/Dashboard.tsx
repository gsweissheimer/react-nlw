import { ReactNode } from 'react';
import Cookies from 'js-cookie';
import Header from '../../components/Header/Header';

import style from  './dashboard.module.css';

type DashboardProps = {
  pageTitle?: string,
  children: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ pageTitle, children }) => {
  const token = Cookies.get('catdogtok');
  return (
    <div className={style.dashboardLayout}>
      <Header token={token} pageTitle={pageTitle} />
      <div className={style.mainLayout}>
        <main className={style.dashboardContainer}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
