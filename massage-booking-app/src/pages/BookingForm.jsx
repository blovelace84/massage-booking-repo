// pages/BookingForm.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import ServiceSelector from "../components/ServiceSelector";
import ProgressSteps from "../components/ProgressSteps";

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const { register, handleSubmit } = useForm();

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, "appointments"), {
        ...data,
        status: "Pending",
        createdAt: new Date(),
      });
      alert("Appointment booked successfully!");
      setStep(1); // Reset form after booking
    } catch (error) {
      console.error("Error booking:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <ProgressSteps currentStep={step} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <>
            <ServiceSelector register={register} />
            <div className="flex justify-end">
              <button type="button" onClick={next} className="bg-blue-500 text-white px-4 py-2 rounded">
                Next
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label className="block mb-1">Choose Date & Time</label>
              <input
                type="datetime-local"
                {...register("dateTime")}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={back} className="text-gray-600">Back</button>
              <button type="button" onClick={next} className="bg-blue-500 text-white px-4 py-2 rounded">
                Next
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <label className="block mb-1">Your Name</label>
              <input {...register("name")} className="w-full border px-3 py-2 rounded" required />
            </div>
            <div>
              <label className="block mb-1">Email Address</label>
              <input type="email" {...register("email")} className="w-full border px-3 py-2 rounded" required />
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={back} className="text-gray-600">Back</button>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                Confirm Booking
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
export default BookingForm;