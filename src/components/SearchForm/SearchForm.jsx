import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import Axios from "axios";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { prepareSearchFormData } from "../../formUtils";
import { getHistograms, getPublications } from "../../store";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./SearchForm.module.css";

const SearchForm = () => {
  const LoginButton = ({ disabled }) => (
    <button
      disabled={disabled}
      type="submit"
      className="universalBtn searchBtn"
    >
      Поиск
    </button>
  );

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.value);

  const options = [
    { value: "any", label: "Любая" },
    { value: "negative", label: "Негативная" },
    { value: "positive", label: "Позитивная" },
  ];

  const today = new Date();

  const schema = yup.object().shape({
    inn: yup
      .string()
      .matches(/^\d{10}$|^\d{12}$/, "Некорректный ИНН")
      .required(),
    limit: yup
      .number()
      .typeError("Можно ввести только цифры")
      .min(1, "Минимальное значение: 1")
      .max(1000, "Максимальное значение: 1000")
      .integer("Можно ввести только целое число")
      .required("Обязательное поле"),
    startDate: yup.date().required(),
    endDate: yup
      .date()
      .min(yup.ref("startDate"), "Дата окончания должны быть позже даты начала")
      .required(),
    maxFullness: yup.boolean(),
    inBusinessNews: yup.boolean(),
    onlyMainRole: yup.boolean(),
    onlyWithRiskFactors: yup.boolean(),
    excludeTechNews: yup.boolean(),
    excludeAnnouncements: yup.boolean(),
    excludeDigests: yup.boolean(),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    if (!data.tonality) {
      data.tonality = options.find(
        (option) => option.value === options[0].value
      );
    }

    if (data.inBusinessNews === false) {
      data.inBusinessNews = null;
    }

    try {
      Axios.all([
        await Axios.post(
          "https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms",
          JSON.stringify(prepareSearchFormData(data)),
          {
            headers: {
              Authorization: 'Bearer ' + token,
              "Content-Type": "application/json",
            }
          }),
        await Axios.post(
          "https://gateway.scan-interfax.ru/api/v1/objectsearch",
          JSON.stringify(prepareSearchFormData(data)),
          {
            headers: {
              Authorization: 'Bearer ' + token,
              "Content-Type": "application/json",
            },
          })
      ]).then(Axios.spread((response1, response2) => {
        dispatch(getHistograms(response1.data));
        dispatch(getPublications(response2.data));
        localStorage.setItem('histograms', JSON.stringify(response1));
        localStorage.setItem('publications', JSON.stringify(response2));
      }))
    } catch (error) {
      console.log(error);
    }
  };


return (
  <form className={styles.searchForm} onSubmit={handleSubmit(onSubmit)}>
    <div className={styles.handleInputs}>
      <label className={styles.formLabel}>
        ИНН компании <sup>*</sup>
      </label>
      <input
        type="text"
        className={styles.formInput}
        placeholder="10 цифр"
        {...register("inn")}
      />
      {errors.inn && (
        <p className={styles.errorMessage}>{errors.inn.message}</p>
      )}
      <label className={styles.formLabel}>
        <span>Тональность</span>
      </label>
      <Controller
        name="tonality"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            className={styles.customSelect}
            classNamePrefix={styles.customSelect}
            options={options}
            defaultValue={options.find(
              (option) => option.value === options[0].value
            )}
          />
        )}
      />
      <label className={styles.formLabel}>
        Количество документов к выдаче <sup>*</sup>
      </label>
      <input
        type="text"
        className={styles.formInput}
        placeholder="От 1 до 1000"
        {...register("limit")}
      />
      {errors.limit && (
        <p className={styles.errorMessage}>{errors.limit.message}</p>
      )}
      <label className={styles.formLabel}>
        Диапазон поиска <sup>*</sup>
      </label>
      <div className={styles.dates}>
        <Controller
          control={control}
          name="startDate"
          render={({ field }) => (
            <DatePicker
              {...field}
              className={styles.date}
              placeholderText="Дата начала"
              dateFormat={"dd.MM.yyyy"}
              maxDate={today}
              selected={field.value ? new Date(field.value) : null}
              onChange={(date) => {
                field.onChange(date);
              }}
            />
          )}
        />
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              className={styles.date + " " + styles.endDate}
              placeholderText="Дата конца"
              dateFormat={"dd.MM.yyyy"}
              maxDate={today}
              selected={field.value ? new Date(field.value) : null}
              onChange={(date) => {
                field.onChange(date);
              }}
            />
          )}
        />
      </div>
      {errors.endDate && (
        <p className={styles.errorMessage}>{errors.endDate.message}</p>
      )}
    </div>
    <div className={styles.checkBoxes}>
      <div className={styles.checkBoxesContainer}>
        <label className={styles.checkBoxLabel + " " + styles.firstCheckbox}>
          <input
            type="checkbox"
            className={styles.checkbox}
            {...register("maxFullness")}
          />{" "}
          Признак максимальной полноты
        </label>
        <label className={styles.checkBoxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            {...register("inBusinessNews")}
          />{" "}
          Упоминания в бизнес-контексте
        </label>
        <label className={styles.checkBoxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            {...register("onlyMainRole")}
          />{" "}
          Главная роль в публикации
        </label>
        <label className={styles.checkBoxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            {...register("onlyWithRiskFactors")}
          />{" "}
          Публикации только с риск-факторами
        </label>
        <label className={styles.checkBoxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            {...register("excludeTechNews")}
          />{" "}
          Включать технические новости рынков
        </label>
        <label className={styles.checkBoxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            {...register("excludeAnnouncements")}
          />{" "}
          Включать анонсы и календари
        </label>
        <label className={styles.checkBoxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            {...register("excludeDigests")}
          />{" "}
          Включать сводки новостей
        </label>
      </div>
      <LoginButton disabled={!isValid} />
      <p className={styles.mark}>* Обязательные к заполнению поля</p>
    </div>
  </form>
);
};

export default SearchForm;
