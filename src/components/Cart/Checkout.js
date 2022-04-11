import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-inputs";
import { useState } from "react";
import DisplayAlert from "../UI/Alert";

const Checkout = (props) => {
  const [isAlert, setIsAlert] = useState(null);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);

  const {
    value: nameInput,
    isValid: isNameValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: streetInput,
    isValid: isStreetValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    valueBlurHandler: streetBlurHandler,
    reset: resetStreet,
  } = useInput((value) => value.trim() !== "");

  const {
    value: postalCodeInput,
    isValid: isPostalCodeValid,
    hasError: postalCodeHasError,
    valueChangeHandler: postalCodeChangeHandler,
    valueBlurHandler: postalCodeBlurHandler,
    reset: resetPostalCode,
  } = useInput((value) => value.trim() !== "" && value.trim().length > 3);

  const {
    value: cityInput,
    isValid: isCityValid,
    hasError: CityHasError,
    valueChangeHandler: CityChangeHandler,
    valueBlurHandler: CityBlurHandler,
    reset: resetCity,
  } = useInput((value) => value.trim() !== "");

  let isFormValid = false;
  if (isNameValid && isStreetValid && isPostalCodeValid && isCityValid) {
    isFormValid = true;
  }

  const confirmHandler = async (event) => {
    event.preventDefault();
    if (!isNameValid || !isStreetValid || !isPostalCodeValid || !isCityValid) {
      return;
    }
    resetName();
    resetStreet();
    resetPostalCode();
    resetCity();

    const res = await props.onConfirm({
      name: nameInput.trim(),
      street: streetInput.trim(),
      postalConde: postalCodeInput.trim(),
      city: cityInput.trim(),
    });

    if (res.status === 200) {
      setIsCheckoutSuccess(true);
      setIsAlert(
        <DisplayAlert
          strong={"Youre done!"}
          message={"Thank you for your order!"}
          color={"success"}
        />
      );
    } else {
      setIsCheckoutSuccess(false);
      setIsAlert(
        <DisplayAlert
          strong={"Error!"}
          message={"Sorry, something went wrong!"}
          color={"error"}
        />
      );
    }
  };

  return (
    <>
      {!isCheckoutSuccess ? (
        <form className={classes.form} onSubmit={confirmHandler}>
          <div className={nameHasError ? classes.invalid : classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={nameInput}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
            />
            {nameHasError && (
              <p className={classes.invalidText}>Name must not be empty!</p>
            )}
          </div>
          <div className={streetHasError ? classes.invalid : classes.control}>
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              value={streetInput}
              onChange={streetChangeHandler}
              onBlur={streetBlurHandler}
            />
            {streetHasError && (
              <p className={classes.invalidText}>Street must not be empty!</p>
            )}
          </div>
          <div
            className={postalCodeHasError ? classes.invalid : classes.control}
          >
            <label htmlFor="postal">Postal Code</label>
            <input
              type="text"
              id="postal"
              value={postalCodeInput}
              onChange={postalCodeChangeHandler}
              onBlur={postalCodeBlurHandler}
            />
            {postalCodeHasError && (
              <p className={classes.invalidText}>
                Postal Code must not be empty, and less than four characters!
              </p>
            )}
          </div>
          <div className={CityHasError ? classes.invalid : classes.control}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={cityInput}
              onChange={CityChangeHandler}
              onBlur={CityBlurHandler}
            />
            {CityHasError && (
              <p className={classes.invalidText}>City must not be empty!</p>
            )}
          </div>
          <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>
              Cancel
            </button>
            {!isAlert && (
              <button className={classes.submit} disabled={!isFormValid}>
                Confirm
              </button>
            )}
          </div>
        </form>
      ) : (
        <section className="mt-3">
          {isAlert && isAlert}
          <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>
              Cancel
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default Checkout;
