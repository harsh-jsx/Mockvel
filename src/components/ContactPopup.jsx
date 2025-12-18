import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import emailjs from "@emailjs/browser";

export default function ContactPopup({ open, onClose }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const [lookingFor, setLookingFor] = useState("");
  const [budget, setBudget] = useState("");
  const [showLookingForDropdown, setShowLookingForDropdown] = useState(false);
  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    if (!open) {
      // Reset form state when popup closes
      setLookingFor("");
      setBudget("");
      setSubmitStatus(null);
      setErrorMessage("");
      setIsSubmitting(false);
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.set(overlayRef.current, { pointerEvents: "auto" })
      .fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
      .fromTo(
        modalRef.current,
        { y: 40, scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.5 },
        "-=0.2"
      );

    return () => tl.kill();
  }, [open]);

  useEffect(() => {
    const escHandler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", escHandler);
    return () => window.removeEventListener("keydown", escHandler);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        (showLookingForDropdown || showBudgetDropdown) &&
        !e.target.closest(".dropdown-container")
      ) {
        setShowLookingForDropdown(false);
        setShowBudgetDropdown(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open, showLookingForDropdown, showBudgetDropdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get form values
    const formData = {
      firstName: e.target.firstName?.value?.trim() || "",
      lastName: e.target.lastName?.value?.trim() || "",
      email: e.target.email?.value?.trim() || "",
      phone: e.target.phone?.value?.trim() || "",
      company: e.target.company?.value?.trim() || "",
      lookingFor: lookingFor,
      budget: budget,
    };

    // Debug: Log form data
    console.log("Form Data:", formData);

    // Validate all required fields
    const missingFields = [];
    if (!formData.firstName) missingFields.push("First Name");
    if (!formData.lastName) missingFields.push("Last Name");
    if (!formData.email) missingFields.push("Email");
    if (!formData.phone) missingFields.push("Phone");
    if (!formData.company) missingFields.push("Company");
    if (!formData.lookingFor) missingFields.push("Service Interest");
    if (!formData.budget) missingFields.push("Budget");

    if (missingFields.length > 0) {
      console.log("Missing fields:", missingFields);
      setErrorMessage(`Please fill: ${missingFields.join(", ")}`);
      setSubmitStatus("error");
      setTimeout(() => {
        setSubmitStatus(null);
        setErrorMessage("");
      }, 3000);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      console.log("Invalid email format:", formData.email);
      setErrorMessage("Please enter a valid email address");
      setSubmitStatus("error");
      setTimeout(() => {
        setSubmitStatus(null);
        setErrorMessage("");
      }, 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const templateParams = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        lookingFor: formData.lookingFor,
        budget: formData.budget,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      };

      // Replace these with your EmailJS credentials
      await emailjs.send(
        "service_5q5qqr9", // Replace with your EmailJS service ID
        "template_nf7kzcf", // Replace with your EmailJS template ID
        templateParams,
        "qqtzycs61FniSNL1R" // Replace with your EmailJS public key
      );

      setSubmitStatus("success");
      formRef.current?.reset();
      setLookingFor("");
      setBudget("");

      setTimeout(() => {
        setSubmitStatus(null);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("EmailJS error:", error);
      console.error("Error details:", {
        message: error.text || error.message,
        status: error.status,
      });
      setErrorMessage(
        error.text ||
          error.message ||
          "Failed to send message. Please try again."
      );
      setSubmitStatus("error");
      setTimeout(() => {
        setSubmitStatus(null);
        setErrorMessage("");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-[90%] max-w-lg rounded-2xl bg-[#0b0b0e] border border-white/10 p-8 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl leading-none"
          aria-label="Close"
        >
          ×
        </button>
        <h3 className="text-2xl font-semibold text-white mb-2">
          Let's work together
        </h3>
        <p className="text-gray-400 mb-6">
          Share your details and we’ll get back within 24 hours.
        </p>

        <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              name="firstName"
              placeholder="First Name"
              onChange={() => {
                if (submitStatus === "error") {
                  setSubmitStatus(null);
                  setErrorMessage("");
                }
              }}
              className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary"
            />

            <input
              required
              name="lastName"
              placeholder="Last"
              onChange={() => {
                if (submitStatus === "error") {
                  setSubmitStatus(null);
                  setErrorMessage("");
                }
              }}
              className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary"
            />
          </div>

          <input
            required
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={() => {
              if (submitStatus === "error") {
                setSubmitStatus(null);
                setErrorMessage("");
              }
            }}
            className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary"
          />

          <input
            required
            name="company"
            placeholder="Company Name"
            onChange={() => {
              if (submitStatus === "error") {
                setSubmitStatus(null);
                setErrorMessage("");
              }
            }}
            className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary"
          />

          <div className="relative dropdown-container">
            <input type="hidden" name="lookingFor" value={lookingFor} />
            <button
              type="button"
              onClick={() => {
                setShowLookingForDropdown(!showLookingForDropdown);
                setShowBudgetDropdown(false);
              }}
              className={`w-full rounded-lg bg-black/40 border px-4 py-3 text-left text-white focus:outline-none focus:border-primary flex items-center justify-between ${
                !lookingFor && submitStatus === "error"
                  ? "border-red-500/50"
                  : "border-white/10"
              }`}
            >
              <span className={lookingFor ? "text-white" : "text-gray-400"}>
                {lookingFor || "What are you looking for?"}
              </span>
              <span className="text-gray-400">▼</span>
            </button>
            {showLookingForDropdown && (
              <div className="absolute z-10 w-full mt-1 rounded-lg bg-black/90 border border-white/10 max-h-60 overflow-y-auto">
                {[
                  "AI & Automation Enablement",
                  "Start-up Marketing Consultancy",
                  "Personal Branding & PR",
                  "Performance Marketing",
                  "AI-Powered Videos",
                  "Social Media Management",
                  "Website Design & Development",
                  "Logo & Brand Identity Design (Vastu-Aligned)",
                  "WhatsApp Marketing Automation",
                  "Search Engine Optimization",
                  "Advertisement & Commercial Shoot",
                ].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setLookingFor(option);
                      setShowLookingForDropdown(false);
                      if (submitStatus === "error") setSubmitStatus(null);
                    }}
                    className="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative dropdown-container">
            <input type="hidden" name="budget" value={budget} />
            <button
              type="button"
              onClick={() => {
                setShowBudgetDropdown(!showBudgetDropdown);
                setShowLookingForDropdown(false);
              }}
              className={`w-full rounded-lg bg-black/40 border px-4 py-3 text-left text-white focus:outline-none focus:border-primary flex items-center justify-between ${
                !budget && submitStatus === "error"
                  ? "border-red-500/50"
                  : "border-white/10"
              }`}
            >
              <span className={budget ? "text-white" : "text-gray-400"}>
                {budget || "Budget"}
              </span>
              <span className="text-gray-400">▼</span>
            </button>
            {showBudgetDropdown && (
              <div className="absolute z-10 w-full mt-1 rounded-lg bg-black/90 border border-white/10">
                {["1L - 2L", "2L - 3L", "3L - 5L", "5L - 10L", "Other"].map(
                  (option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setBudget(option);
                        setShowBudgetDropdown(false);
                        if (submitStatus === "error") setSubmitStatus(null);
                      }}
                      className="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors"
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          <input
            required
            type="email"
            name="email"
            placeholder="Email address"
            onChange={() => {
              if (submitStatus === "error") {
                setSubmitStatus(null);
                setErrorMessage("");
              }
            }}
            className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary"
          />

          <button
            type="submit"
            disabled={isSubmitting || !lookingFor || !budget}
            className="w-full mt-4 rounded-lg bg-primary py-3 font-medium text-black hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send inquiry"}
          </button>

          {submitStatus === "success" && (
            <p className="text-green-400 text-sm text-center mt-2">
              ✓ Message sent successfully!
            </p>
          )}
          {submitStatus === "error" && (
            <p className="text-red-400 text-sm text-center mt-2 animate-pulse">
              ✗{" "}
              {errorMessage || "Please fill all required fields and try again."}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
