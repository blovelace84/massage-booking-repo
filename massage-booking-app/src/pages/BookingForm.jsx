// pages/BookingForm.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import ServiceSelector from "../components/ServiceSelector";
import ProgressSteps from "../components/ProgressSteps";

function BookingForm() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, "appointments"), {
        ...data,
        status: "Pending",
        createdAt: new Date(),
      });
      alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking:", error);
    }
  };

  return (
    <div className="p-4">
      <ProgressSteps currentStep={step} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <div>
            <ServiceSelector register={register} />
            <button type="button" onClick={() => setStep(2)}>Next</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <label>Date & Time</label>
            <input type="datetime-local" {...register("dateTime")} required />
            <button type="button" onClick={() => setStep(1)}>Back</button>
            <button type="button" onClick={() => setStep(3)}>Next</button>
          </div>
        )}

        {step === 3 && (
          <div>
            <label>Name</label>
            <input {...register("name")} required />
            <label>Email</label>
            <input type="email" {...register("email")} required />
            <button type="button" onClick={() => setStep(2)}>Back</button>
            <button type="submit">Confirm Booking</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default BookingForm;