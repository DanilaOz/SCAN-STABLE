import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Slider from "../../components/Slider/Slider";
import TariffCard from "../../components/TariffCard/TariffCard";
import { getHistograms, getPublications } from "../../store";

import styles from "./MainPage.module.css";

import bulb from '../../assets/images/bulb-tariff-beginner.svg'
import target from '../../assets/images/target-tariff-pro.svg'
import laptop from '../../assets/images/laptop-tariff-business.svg' 
import checkMark from '../../assets/images/tariff-includes-item.svg'

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authorized = useSelector((state) => state.isUserLogged.value);
  const histograms = useSelector((state) => state.histograms.value);
  const publications = useSelector((state) => state.publications.value);

  return (
    <>
      <section className={styles.hero}>
        <h1 className="title">
          сервис по поиску <br /> публикаций <br /> о компании <br /> по его ИНН
        </h1>
        <p className={styles.heroText}>
          Комплексный анализ публикаций, получение данных в формате PDF на
          электронную почту.
        </p>
        <button
          className="universalBtn dataBtn"
          onClick={() => {
            navigate("Search");
            if (histograms && publications) {
              dispatch(getHistograms(null));
              dispatch(getPublications(null));
              localStorage.removeItem('histograms');
              localStorage.removeItem('publications');
            };
          }}
          style={{display: !authorized ? "none" : "block"}}
        >
          Запросить данные
        </button>
      </section>

      <section className={styles.slider}>
        <h2 className="title subtitle">Почему именно мы</h2>
        <Slider />
        <div className={styles.manOnTheBench}></div>
      </section>

      <section className={styles.rates}>
        <h2 className="title subtitle">наши тарифы</h2>
        <div className={styles.tariffCardsContainer}>
          <div className={styles.tarrifCards}>
            <TariffCard
              cardTitle={"Beginner"}
              subtitle={"Для небольшого исследования"}
              tariffImg={bulb}
              price={"799 ₽"}
              crossedOutPrice={"1 200 ₽"}
              installmentPayment={"или 150 ₽/мес. при рассрочке на 24 мес."}
              btnText={"Подробнее"}
              firstEl={"Безлимитная история запросов"}
              secondEl={"Безопасная сделка"}
              thirdEl={"Поддержка 24/7"}
              checkMark={checkMark}
              backColor={"#FFB64F"}
              authorized={authorized}
            />
          </div>
          <div className={styles.tarrifCards}>
            <TariffCard
              cardTitle={"Pro"}
              subtitle={"Для HR и фрилансеров"}
              tariffImg={target}
              price={"1 299 ₽"}
              crossedOutPrice={"2 600 ₽"}
              installmentPayment={"или 279 ₽/мес. при рассрочке на 24 мес."}
              btnText={"Подробнее"}
              firstEl={"Все пункты тарифа Beginner"}
              secondEl={"Экспорт истории"}
              thirdEl={"Рекомендации по приоритетам"}
              checkMark={checkMark}
              backColor={"#7CE3E1"}
            />
          </div>
          <div className={styles.tarrifCards}>
            <TariffCard
              cardTitle={"Business"}
              subtitle={"Для корпоративных клиентов"}
              tariffImg={laptop}
              price={"2 379 ₽"}
              crossedOutPrice={"3 700 ₽"}
              installmentPayment={"или 352 ₽/мес. при рассрочке на 24 мес."}
              btnText={"Подробнее"}
              firstEl={"Все пункты тарифа Pro"}
              secondEl={"Безлимитное количество запросов"}
              thirdEl={"Приоритетная поддержка"}
              checkMark={checkMark}
              backColor={"#000000"}
              color={"#FFFFFF"}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default MainPage;
