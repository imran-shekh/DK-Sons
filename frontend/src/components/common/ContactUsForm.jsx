import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../data/countrycode.json";
import "react-loading-skeleton/dist/skeleton.css";

import { contactUsForm } from "@/services/operations/contactAPI";

const ContactUsForm = () => {
  const [loading, setloading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("Form Submitted");
    setloading(true);
  
    const { countrycode, email, firstName, lastName, message, phoneNo } = data;
  
    try {
      await contactUsForm(countrycode, email, firstName, lastName, message, phoneNo);
    } catch (error) {
      console.error("Error in contactUsForm:", error);
    }
  
    setloading(false);
  };
  

  useEffect(() => {
    if (isSubmitSuccessful) {
      if (loading === false) {
        reset({
          email: "",
          firstName: "",
          lastName: "",
          message: "",
          phoneNo: "",
        });
      }
    }
  }, [reset, isSubmitSuccessful,loading]);

  return (
    <form
      onSubmit={handleSubmit(submitContactForm)}
      className="flex flex-col gap-7"
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        {/* First Name */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstName" className="lable-style">
            First Name<sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter First Name"
            {...register("firstName", { required: true })}
            className="form-style h-12 rounded-lg bg-richblack-700 p-3 border-b-2 border-richblack-300"
          />
          {errors.firstName && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your First name.
            </span>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastName" className="lable-style">
            Last Name{" "}
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter Last Name"
            {...register("lastName")}
            className="form-style h-12 rounded-lg bg-richblack-700 p-3 border-b-2 border-richblack-300"
          />
          {/* Not mandatory so no erro is shown */}
        </div>
      </div>

      {/*Email*/}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="lable-style">
          Email<sup className="text-pink-200">*</sup>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email Address"
          {...register("email", { required: true })}
          className="form-style h-12 rounded-lg bg-richblack-700 p-3 border-b-2 border-richblack-300"
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Email Address.
          </span>
        )}
      </div>

      {/* /* Country Code and Phone no */}

      <div className="flex flex-col gap-2">
        <label className="lable-style" htmlFor="phonenumber">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Phone Number<sup className="text-pink-200">*</sup>
          </p>
        </label>

        <div className="flex items-center gap-5 ">
          {/* Dropdown */}
          <div className="flex w-[84px] flex-col gap-2 ">
            <select
              name="dropdown"
              id="dropdown"
              {...register("countrycode", { required: true })}
              className="form-style bg-richblack-700"
            >
              {CountryCode.map((element, index) => {
                return (
                  <option key={index} value={element.code}>
                    {element.code} -{element.country}
                  </option>
                );
              })}
            </select>
          </div>

          {/* phone number */}
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className="form-style h-12 rounded-lg bg-richblack-700 p-3 border-b-2 border-richblack-300"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please Enter Your Phone Number",
                },
                maxLength: { value: 11, message: "Invalid Phone Number" },
                minLength: { value: 8, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      {/*Message*/}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="lable-style">
          Message<sup className="text-pink-200">*</sup>
        </label>
        <textarea
          name="emmessageail"
          id="message"
          cols="30"
          rows="8"
          placeholder="Enter Your Message Here..."
          {...register("message", { required: true })}
          className="form-style rounded-lg bg-richblack-700 p-3 border-b-2 border-richblack-300"
        />
        {errors.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Message
          </span>
        )}
      </div>

      <button
        type="submit"
        className="rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         transition-all duration-200 hover:scale-95 hover:shadow-none  disabled:bg-richblack-500 sm:text-[16px] "
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactUsForm;
