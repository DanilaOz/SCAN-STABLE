import Logo from '../../assets/images/scan-footer-logo.svg'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="wrapper header-footer-content">
        <img src={Logo} alt="header-logo" />
        <div className={styles.info}>
          <p className={styles.contacts}>г. Москва, Цветной б-р, 40
            +7 495 771 21 11
            info@skan.ru
          </p>
          <p className={styles.copy}>
            Copyright. 2022
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer