import Axios from "axios";
import { useSelector } from "react-redux";
import ResultsSlider from "../ResultsSlider/ResultsSlider";
import PublicationCard from "../PublicationCard/PublicationCard";
import styles from "./Results.module.css";
import { useEffect, useState } from "react";

const Results = () => {
  const histograms = JSON.parse(localStorage.getItem("histograms"));
  const publications = JSON.parse(localStorage.getItem("publications"));
  const token = useSelector((state) => state.token.value);

  const [encodedIds, SetEncodedIds] = useState([]);
  const [requestResults, setRequestResults] = useState([]);

  useEffect(() => {
    const ids = publications.data.items.map((item, index) => item.encodedId);
    SetEncodedIds(ids);
  }, []);

  const documentsRequest = async (encodedId) => {
    try {
      await Axios.post(
        "https://gateway.scan-interfax.ru/api/v1/documents",
        { ids: [encodedId] },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      ).then((res) =>
        setRequestResults((prevResults) => [...prevResults, res])
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const firstTenIds = encodedIds.slice(0, 10);
    firstTenIds.forEach((item) => {
      documentsRequest(item);
    });
  }, [encodedIds]);

  console.log(requestResults);

  // Окончание слова "вариант"
  const getWordEnding = (count) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return "ов";
    } else if (lastDigit === 1) {
      return "а";
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return "а";
    } else {
      return "ов";
    }
  };

  return (
    <div className={styles.resultsContainer}>
      <h1
        className="title titlePages"
        style={{ maxWidth: "509px", letterSpacing: "0.04em" }}
      >
        Ищем. Скоро будут результаты
      </h1>
      <p className={styles.underTitle}>
        Поиск может занять некоторое время, <br /> просим сохранять терпение.
      </p>
      <h3 className={styles.resultsTitle} style={{ marginTop: "127px" }}>
        Общая сводка
      </h3>
      <p className={styles.optionsFound}>
        Найдено {publications.data.items.length} вариант
        {getWordEnding(publications.data.items.length)}
      </p>
      <ResultsSlider histograms={histograms} className={styles.slider} />
      <h3 className={styles.resultsTitle} style={{ marginTop: "107px" }}>
        Список документов
      </h3>
      <PublicationCard />
    </div>
  );
};

export default Results;
