import { ReactNode } from 'react';
import Cookies from 'js-cookie';
import Header from '../../components/Header/Header';

import './Dashboard.css';

type DashboardProps = {
  pageTitle?: string,
  children: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ pageTitle, children }) => {
  const token = Cookies.get('catdogtok');
  return (
    <div className="dashboard-layout">
      <Header token={token} pageTitle={pageTitle} />
      <div className="main-layout">
        <main className="dashboard-container">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
