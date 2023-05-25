import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import SliderCard from "../SliderCard/SliderCard";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./Slider.module.css";

import timeImg from "../../assets/images/Time-slider-image.svg";
import searchImg from "../../assets/images/Search-slider-image.svg";
import shieldImg from "../../assets/images/Shield-slider-image.svg";
import swiperPrev from "../../assets/images/swiper-arrow-left.svg"
import swiperNext from "../../assets/images/swiper-arrow-right.svg"

const Slider = () => {
  const [screenSize, setScreenSize] = useState(window.screen.width);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.screen.width);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderController}>
          <img src={swiperPrev} alt="arrow-left" className="swiperBtnPrev" />
        </div>
        <Swiper
          slidesPerView={
            screenSize < 865 ? 1 : screenSize >= 865 && screenSize < 1320 ? 2 : 3
          }
          spaceBetween={45}
          loop={true}
          navigation={{
            nextEl: '.swiperBtnNext',
            prevEl: '.swiperBtnPrev',
          }}
          modules={[Navigation]}
          className={styles.mySwiper}
        >
          <SwiperSlide>
            <SliderCard cardImg={timeImg} title={"Высокая и оперативная скорость обработки заявки"}/>
          </SwiperSlide>
          <SwiperSlide>
            <SliderCard cardImg={searchImg} title={"Огромная комплексная база данных, обеспечивающая объективный ответ на запрос"}/>
          </SwiperSlide>
          <SwiperSlide>
            <SliderCard cardImg={shieldImg} title={"Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству"}/>
          </SwiperSlide>
          <SwiperSlide>
            <SliderCard cardImg={timeImg} title={"Высокая и оперативная скорость обработки заявки"}/>
          </SwiperSlide>
          <SwiperSlide>
            <SliderCard cardImg={searchImg} title={"Огромная комплексная база данных, обеспечивающая объективный ответ на запрос"}/>
          </SwiperSlide>
          <SwiperSlide>
            <SliderCard cardImg={shieldImg} title={"Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству"}/>
          </SwiperSlide>
        </Swiper>
        <div className={styles.sliderController}>
          <img src={swiperNext} alt="arrow-right" className="swiperBtnNext" />
        </div>
      </div>
    </>
  );
};

export default Slider;
