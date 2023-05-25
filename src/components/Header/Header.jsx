import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { logout, removeToken } from "../../store";
import Logo from "../../assets/images/scan-header-logo.svg";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authorized = useSelector((state) => state.isUserLogged.value);
  const token = useSelector((state) => state.token.value);

  const { data, isLoading } = useQuery(["accountInfo"], async () => {
    return await Axios.get(
      "https://gateway.scan-interfax.ru/api/v1/account/info",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).then((res) => res.data);
  },
  { enabled: token ? true : false });

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expire");
    dispatch(logout(false));
    dispatch(removeToken(null));
  };

  return (
    <header className={styles.header}>
      <div className="wrapper header-footer-content">
        <div className={styles.links}>
          <img src={Logo} alt="header-logo" />
          <ul className={styles.navbar}>
            <li className={styles.navbar__item}>
              <Link to="/" className={styles.navbar__link}>
                Главная
              </Link>
            </li>
            <li className={styles.navbar__item}>
              <Link to="*" className={styles.navbar__link}>
                Тарифы
              </Link>
            </li>
            <li className={styles.navbar__item}>
              <Link to="*" className={styles.navbar__link}>
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div
          className={styles.authorizationButtons}
          style={{ display: authorized ? "none" : "flex" }}
        >
          <Link to="*" className={styles.registerBtn}>
            Зарегистрироваться
          </Link>
          <hr className={styles.line} />
          <button
            onClick={() => navigate("/Authorization")}
            className={styles.signInBtn}
          >
            Войти
          </button>
        </div>
        <div
          className={styles.limits}
          style={{ display: !authorized ? "none" : "flex" }}
        >
          <span className={styles.loader} style={{ display: isLoading ? "flex" : "none" }}></span>
          <div
            className={styles.accInfoContainer}
            style={{
              display: isLoading ? "none" : "block",
            }}
          >
            <span className={styles.accountInfo}>
              <p className={styles.limit}>Использовано компаний</p>
              <p className={styles.companiesUsed}>
                {data?.eventFiltersInfo.usedCompanyCount}
              </p>
            </span>
            <span className={styles.accountInfo}>
              <p className={styles.limit}>Лимит по компаниям</p>
              <p className={styles.companyLimit}>
                {data?.eventFiltersInfo.companyLimit}
              </p>
            </span>
          </div>
        </div>
        <div
          className={styles.authorizedUser}
          style={{ display: !authorized ? "none" : "flex" }}
        >
          <div className={styles.userInfo}>
            <p className={styles.userName}>Алексей А.</p>
            <button className={styles.logOut} onClick={handleLogout}>
              Выйти
            </button>
          </div>
          <div className={styles.userPhoto} />
        </div>
      </div>
    </header>
  );
};

export default Header;
