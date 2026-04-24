"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES_DATA } from "@/lib/services-data";
import Step1_Services from "./Step1_Services";
import Step2_Barbers from "./Step2_Barbers";
import Step3_Calendar from "./Step3_Calendar";
import Step4_Details from "./Step4_Details";
import BookingSummary from "./BookingSummary";
import { CheckCircle2 } from "lucide-react";

const STEPS = ["Service", "Barber", "Schedule", "Details"];

export default function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    service: null,
    barber: null,
    date: null,
    time: null,
    details: { name: "", phone: "", email: "", notes: "" }
  });
  const [isConfirmed, setIsConfirmed] = useState(false);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const variants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, type: "spring" as const, stiffness: 200, damping: 25 }
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.4 }
    })
  };

  if (isConfirmed) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-8 glass p-20 rounded-3xl border-gold/20">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-gold">
          <CheckCircle2 size={120} />
        </motion.div>
        <h2 className="text-5xl font-accent text-gold uppercase">Booking Confirmed!</h2>
        <p className="text-warm-white/60 font-body text-xl">We&apos;ve sent a confirmation email to {bookingData.details.email}.</p>
        <div className="bg-gold/10 p-6 rounded-2xl border border-gold/30">
          <p className="text-xs text-gold font-mono uppercase tracking-widest">Reference Number</p>
          <p className="text-3xl text-warm-white font-accent mt-2">JB-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>
        <button className="px-10 py-4 bg-gold text-black font-accent text-xl rounded-full uppercase hover:scale-105 transition-transform">
          Add to Calendar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start">
      {/* Main Wizard */}
      <div className="flex-1 w-full space-y-12">
        {/* Progress Bar */}
        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            className="absolute inset-y-0 left-0 bg-gold shadow-[0_0_15px_rgba(201,168,76,0.5)]"
          />
        </div>

        <div className="relative perspective-2000 min-h-[600px]">
          <AnimatePresence mode="wait" custom={1}>
            <motion.div
              key={currentStep}
              custom={1}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-full transform-style-3d"
            >
              {currentStep === 0 && (
                <Step1_Services 
                  selected={bookingData.service} 
                  onSelect={(s: any) => setBookingData({ ...bookingData, service: s })} 
                  onNext={nextStep} 
                />
              )}
              {currentStep === 1 && (
                <Step2_Barbers 
                  selected={bookingData.barber} 
                  onSelect={(b: any) => setBookingData({ ...bookingData, barber: b })} 
                  onNext={nextStep} 
                  onBack={prevStep}
                />
              )}
              {currentStep === 2 && (
                <Step3_Calendar 
                  data={bookingData}
                  onSelect={(date: any, time: any) => setBookingData({ ...bookingData, date, time })}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {currentStep === 3 && (
                <Step4_Details 
                  data={bookingData}
                  onChange={(details: any) => setBookingData({ ...bookingData, details })}
                  onConfirm={() => setIsConfirmed(true)}
                  onBack={prevStep}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Summary Sidebar */}
      <div className="w-full lg:w-96 sticky top-32">
        <BookingSummary data={bookingData} step={currentStep} />
      </div>
    </div>
  );
}
