import { useSelector } from "react-redux";
import Search from "../../components/Search/Search";
import Results from "../../components/Results/Results"
import styles from "./SearchPage.module.css";

const SearchPage = () => {
  
  const histograms = useSelector((state) => state.histograms.value);
  const publications = useSelector((state) => state.publications.value);

  return (
    <>
      <section className={styles.search}>
        {(histograms && publications) ? <Results/> : <Search/>}
      </section>
    </>
  );
};

export default SearchPage;
