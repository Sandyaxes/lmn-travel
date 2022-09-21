import React, { useState } from "react";
import { disablePastDate } from '../../helpers/disablePastDate';
import { countDays } from "../../helpers/countDays";
import { isValidID } from "../../helpers/isValidID";
import { getAge } from "../../helpers/getAge";
import { compareAge } from "../../helpers/compareAge";
import { confirmBaseCity } from "../../helpers/confirmBaseCity";
import "./InputForm.scss";

const InputForm = () => {

  let input = [
    {name: "Vusi", age: 21, city: "JHB"},
    {name: "Thando", age: 28, city: "CPT"},
    {name: "Anele", age: 30, city: "PE"},
    {name: "Lisa", age: 26, city: "DUR"},
    {name: "Linda", age: 19, city: "JHB"},
  ];

  const initialValues = {
    name: "",
    cityName: "",
    startDate: '',
    endDate: "",
    days: "",
    idNumber: "",
    mobileNumber: "",
  }

  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmit, setSubmit] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [modal, setModal] = useState(false);

  const firstDay = new Date(formValues.startDate);
  const lastDay = new Date(formValues.endDate);


  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  };


  const handleChange = (e) => {
    const {name, value } = e.target;
    setFormValues({...formValues, [name]: value});
    setStartDate(startDate);
    setEndDate(endDate)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(validate(formValues));
    setSubmit(true)
  }

  const validate = (values) => {
  const errors = {}

  if (!values.name) {
    errors.name = "Traveler name is Required";
  }

  if (!values.cityName) {
    errors.cityName = "City name is Required";
  } 
  else if (confirmBaseCity(input,[values.name, values.cityName])){
    errors.cityName = "You can not travel within own base city.";
  }

  if (!values.startDate) {
    errors.startDate = "Date is Required";
  }

  if (!values.endDate) {
    errors.endDate = "Date is Required";
  }

  if (!values.idNumber) {
    errors.idNumber = "ID number is Required";
  }
  else if(!isValidID(values.idNumber)){
    errors.idNumber = "ID number not valid";
  } else if(getAge(values.idNumber)  !== compareAge(input, values.name)){
    errors.idNumber = "ID number do not match the age";
  }

  if (!values.mobileNumber) {
    errors.mobileNumber = "Phone number is Required";
  }
  else if(!values.mobileNumber.match(/^0[1-8]{1}[0-9]{1}[0-9]{7}$/g)){
  errors.mobileNumber = "Phone number not valid";
  }


  return errors;
};

  return (
        <section className="layout-section">
          <form onSubmit={handleSubmit}>
            <div className="form">
              <div className="input-block name-input">
                <label>TRAVELER NAME</label>
                <select className="field-input"  name="name"  value={formValues.name} onChange={handleChange}>
                <option defaultValue disabled value="">Select name for Traveler</option>
                {input.map((traveler)=><option >{traveler.name}</option>)}
                </select>
                <p className="error-message">{errors.name}</p>
              </div>
              <div className="input-block">
                <label>DESTINATION</label>
                <select className="field-input" name='cityName'  value={formValues.cityName} onChange={handleChange}>
                <option defaultValue disabled value="">Going to</option>
                {input.map((item)=><option>{item.city}</option>)}
                </select>
                <p className="error-message">{errors.cityName}</p>
              </div>
              <div className="input-block">
                <label>TRAVEL START</label>
                <input
                  className="field-input"
                  name="startDate"
                  type="date"
                  min={disablePastDate()}
                  value={formValues.startDate}
                  onChange={handleChange}
                />
                <p className="error-message">{errors.startDate}</p>
              </div>
              <div className="input-block">
                <label>END DATE</label>
                <input
                  className="field-input"
                  name="endDate"
                  type="date"
                  min={disablePastDate()}
                  value={formValues.endDate}
                  onChange={handleChange}
                />
                <p className="error-message">{errors.endDate}</p>
              </div>
              <div className="input-block">
                <label>NUMBER OF DAYS</label>
                <input
                  className="field-input"
                  name="days"
                  disabled={true}
                  value={formValues.days} onChange={handleChange}
                  placeholder={countDays(firstDay, lastDay)}
                />
              </div>
              <>
                <button
                  onClick={toggleModal}
                  className={`btn-modal next-btn`}
                  type="button"
                >
                  Next
                </button>

                {modal && (
                  <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                    {Object.keys(errors).length === 0 && isSubmit ?
                    <>
                     <h2>Confirm Details</h2>
                     <pre>Name: {formValues.name}</pre> 
                     <pre>City: {formValues.cityName}</pre>
                     <pre>Travel date: {formValues.startDate}</pre>
                     <pre>Return date: {formValues.endDate}</pre>
                     <pre>Days: {countDays(firstDay, lastDay)}</pre>
                     <pre>ID number: {formValues.idNumber}</pre>
                     <pre>Phone number: {formValues.mobileNumber}</pre>
                     <button type="button" className="close-modal" onClick={toggleModal}>
                        X
                      </button>
                     <button className="save-btn" type="button" onClick={toggleModal}>
                        save
                      </button>
                     </>
                    : 
                      <>
                      <h2>Complete the form and save</h2>
                      <div className="input-modal">
                        <label>ID Number</label>
                        <input
                          className="field-modal"
                          name="idNumber"
                          type="tel"
                          placeholder="ID Number"
                          maxLength={13}
                          value={formValues.idNumber}
                          onChange={handleChange}
                        />
                        <p className="error-message">{errors.idNumber}</p>
                      </div>
                      <div className="input-modal">
                        <label>Phone Number</label>
                        <input
                          className="field-modal"
                          name="mobileNumber"
                          type="text"
                          placeholder="Phone Number"
                          maxLength={10}
                          pattern="[0-9]+"
                          value={formValues.mobileNumber}
                          onChange={handleChange}
                        />
                        <p className="error-message">{errors.mobileNumber}</p>
                      </div>
                      <button className="close-modal" onClick={toggleModal}>
                        X
                      </button>
                      <button className="save-btn" type="submit">
                        Confirm
                      </button>
                      </>
                }
                    </div>
                  </div>
                )}
              </>
            </div>
            <div></div>
          </form>
        </section>
  );
};

export default InputForm;
