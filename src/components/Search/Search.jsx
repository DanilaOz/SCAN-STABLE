import SearchForm from '../SearchForm/SearchForm'
import styles from './Search.module.css'

const Search = () => {
  return (
    <div className={styles.searchContainer}>
      <h1 className="title titlePages">
        Найдите необходимые данные в пару кликов.
      </h1>
      <p className={styles.underTitle}>Задайте параметры поиска. <br/> Чем больше заполните, тем точнее поиск</p>
      <SearchForm />
    </div>
  )
}

export default Search