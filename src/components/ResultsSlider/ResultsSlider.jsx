import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import styles from "./ResultsSlider.module.css";

import "swiper/css";
import "swiper/css/navigation";

import swiperPrev from "../../assets/images/swiper-arrow-left.svg";
import swiperNext from "../../assets/images/swiper-arrow-right.svg";

const ResultsSlider = (props) => {
  const { histograms } = props;

  return (
    <>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderController}>
          <img src={swiperPrev} alt="arrow-left" className="swiperBtnPrev" />
        </div>
        <div className={styles.sliderHeader}>
          <span className={styles.headerTitle}>Период</span>
          <span className={styles.headerTitle}>Всего</span>
          <span className={styles.headerTitle}>Риски</span>
        </div>
        <Swiper
          cssMode={true}
          slidesPerView={"auto"}
          navigation={{
            nextEl: ".swiperBtnNext",
            prevEl: ".swiperBtnPrev",
          }}
          modules={[Navigation]}
          className={styles.mySwiper}
        >
          {histograms.data.data[0].data.map((item, index) => [
            <SwiperSlide key={index} className={styles.resultSwiperSlide}>
              <div className={styles.data}>
                <span className={styles.dataResults}>
                  {item.date.split("T")[0].split("-").reverse().join(".")}
                </span>
                <span className={styles.dataResults}>{item.value}</span>
                <span className={styles.dataResults}>
                  {histograms.data.data[1].data[index].value}
                </span>
              </div>
            </SwiperSlide>,
          ])}
        </Swiper>
        <div className={styles.sliderController}>
          <img src={swiperNext} alt="arrow-right" className="swiperBtnNext" />
        </div>
      </div>
    </>
  );
};

export default ResultsSlider;
