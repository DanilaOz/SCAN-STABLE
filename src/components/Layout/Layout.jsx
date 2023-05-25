import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import { logout, removeToken } from "../../store";

import styles from './Layout.module.css'

const Layout = () => { 
  const dispatch = useDispatch();

  // Logout, если текущая дата и время больше expire token
  useEffect(() => {
    const expireToken = localStorage.getItem('expire');
    const currentDateTime = moment().format('YYYY-MM-DDTHH:mm:ssZ');
    const isTokenExpired = moment(currentDateTime).isSameOrAfter(expireToken);
    if (isTokenExpired) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("expire");
      dispatch(logout(false));
      dispatch(removeToken(null));
    }
  }, [dispatch]);
  
  return (
    <div className={styles.layout}>
        <Header />
        <main className="main">
          <div className="wrapper">
            <Outlet />
          </div>
        </main>
        <Footer />
    </div>
  )
}

export default Layout