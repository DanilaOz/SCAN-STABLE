import styles from "./TariffCard.module.css";

const TariffCard = (props) => {
  const { authorized } = props;
  return (
    <div className={styles.card}>
      <div
        className={styles.cardHead}
        style={{ backgroundColor: props.backColor }}
      >
        <div className={styles.cardHeadText}>
          <h3 className={styles.cardTitle} style={{ color: props.color }}>
            {props.cardTitle}
          </h3>
          <p classnmae={styles.subtitle} style={{ color: props.color }}>
            {props.subtitle}
          </p>
        </div>
        <img
          src={props.tariffImg}
          alt="tariff-img"
          className={styles.tariffImage}
        />
      </div>
      <div
        className={styles.cardDescription}
        style={{ border: authorized ? `2px solid ${props.backColor}` : "none" }}
      >
        <div className={styles.prices}>
          <p className={styles.price}>{props.price}</p>
          <p className={styles.crossedOutPrice}>{props.crossedOutPrice}</p>
          <p
            className={styles.currentTariff}
            style={{ display: authorized ? "block" : "none" }}
          >
            Текущий тариф
          </p>
        </div>
        <p className={styles.installmentPayment}>{props.installmentPayment}</p>
        <div className={styles.tariffIncludes}>
          <p className={styles.includesTitle}>В тариф входит:</p>
          <div className={styles.includesList}>
            <div className={styles.includesItem}>
              <img src={props.checkMark} alt="check-mark" />
              <p className={styles.itemText}>{props.firstEl}</p>
            </div>
            <div className={styles.includesItem}>
              <img src={props.checkMark} alt="check-mark" />
              <p className={styles.itemText}>{props.secondEl}</p>
            </div>
            <div className={styles.includesItem}>
              <img src={props.checkMark} alt="check-mark" />
              <p className={styles.itemText}>{props.thirdEl}</p>
            </div>
          </div>
        </div>
        <button
          className="universalBtn tariffCardBtn"
           style={{
            marginBottom: authorized ? "22px" : "24px",
            marginTop: authorized ? "48px" : "50px",
            color: authorized ? "#000000" : "#FFFFFF",
            backgroundColor: authorized ? "#D2D2D2" : "5970FF",
          }}
        >
          {authorized ? "Перейти в личный кабинет" : props.btnText}
        </button>
      </div>
    </div>
  );
};

export default TariffCard;
