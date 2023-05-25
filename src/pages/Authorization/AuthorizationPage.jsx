import Axios from "axios";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { login, getToken } from "../../store";
import { useDispatch } from "react-redux";
import styles from "./AuthorizationPage.module.css";

import lock from "../../assets/images/lock.svg";

const AuthorizationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorValue, setErrorValue] = useState("");

  const LoginButton = ({ disabled }) => (
    <button disabled={disabled} type="submit" className="universalBtn loginBtn">
      Войти
    </button>
  );

  const schema = yup.object().shape({
    login: yup.string().required(),
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await Axios.post(
        "https://gateway.scan-interfax.ru/api/v1/account/login",
        {
          login: data.login,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("expire", response.data.expire);
        })
        .then(() => {
          dispatch(getToken(localStorage.getItem("accessToken")));
          dispatch(login(true));
          navigate("/", { replace: true });
        });
    } catch (error) {
      setErrorValue("Неправильный логин или пароль. Введите корректные данные");
    }
    reset();
  };

  return (
    <>
      <section className={styles.login}>
        <h1 className="title titlePages">
          Для оформления подписки на тариф, необходимо авторизоваться.
        </h1>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <img src={lock} className={styles.lock} alt="lock" />
          <div className={styles.formTabs}>
            <span className={styles.tabSignIn}>Войти</span>
            <span className={styles.tabReg}>Зарегистрироваться</span>
          </div>
          <label className={styles.formLabel}>Логин или номер телефона:</label>
          <input
            type="text"
            className={styles.formInput}
            {...register("login")}
          />
          <label className={styles.formLabel}>Пароль:</label>
          <input
            type="password"
            className={styles.formInput}
            {...register("password")}
          />
          <p className={styles.errorMessage}>{errorValue}</p>
          <LoginButton disabled={!isValid} />
          <button className={styles.passwordReset}>Восстановить пароль</button>
          <p className={styles.socialText}>Войти через:</p>
          <div className={styles.socialLinks}>
            <button className={styles.socialBtn + " " + styles.googleBtn} />
            <button className={styles.socialBtn + " " + styles.facebookBtn} />
            <button className={styles.socialBtn + " " + styles.yandexBtn} />
          </div>
        </form>
      </section>
    </>
  );
};

export default AuthorizationPage;
