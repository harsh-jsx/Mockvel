import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    company: "",
    lookingFor: "",
    budget: "",
  });
  const [showLookingForDropdown, setShowLookingForDropdown] = useState(false);
  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const headingRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (!headingRef.current || !formRef.current) return;

    const ctx = gsap.context(() => {
      const words = headingRef.current.querySelectorAll(".word");

      if (words.length) {
        gsap.from(words, {
          y: 100,
          opacity: 0,
          rotateX: -45,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
        });
      }

      gsap.from(formRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLookingForDropdown, showBudgetDropdown]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submitStatus === "error") {
      setSubmitStatus(null);
      setErrorMessage("");
    }
  };

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get form values
    const submitData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company: formData.company.trim(),
      lookingFor: formData.lookingFor,
      budget: formData.budget,
    };

    // Validate all required fields
    const missingFields = [];
    if (!submitData.firstName) missingFields.push("First Name");
    if (!submitData.lastName) missingFields.push("Last Name");
    if (!submitData.email) missingFields.push("Email");
    if (!submitData.phone) missingFields.push("Phone");
    if (!submitData.company) missingFields.push("Company");
    if (!submitData.lookingFor) missingFields.push("Service Interest");
    if (!submitData.budget) missingFields.push("Budget");

    if (missingFields.length > 0) {
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
    if (!emailRegex.test(submitData.email)) {
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
        firstName: submitData.firstName,
        lastName: submitData.lastName,
        email: submitData.email,
        phone: submitData.phone,
        company: submitData.company,
        lookingFor: submitData.lookingFor,
        budget: submitData.budget,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      };

      await emailjs.send(
        "service_5q5qqr9",
        "template_nf7kzcf",
        templateParams,
        "qqtzycs61FniSNL1R"
      );

      setSubmitStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        company: "",
        lookingFor: "",
        budget: "",
      });
      setStep(1);

      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      console.error("EmailJS error:", error);
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-900 relative overflow-hidden">
      {/* Background elements - Corporate blue gradient */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle blue gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(37, 99, 235, 0.1), transparent 50%)",
          }}
        />
      </div>

      <div className="relative z-10 pt-24 pb-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div ref={headingRef} className="mb-12">
            <div className="overflow-hidden">
              <h1 className="word font-display text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.9] text-blue-900 font-bold">
                Let's talk.
              </h1>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-[1fr,1fr] gap-12 lg:gap-20 items-start">
            {/* Form Card */}
            <div ref={formRef} className="max-w-lg">
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl border border-blue-100">
                {/* Step indicator */}
                <div className="flex items-center gap-2 mb-6">
                  {[1, 2].map((s) => (
                    <div
                      key={s}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        s <= step ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Your Details */}
                  {step === 1 && (
                    <div className="space-y-5">
                      <h2 className="text-lg font-semibold text-gray-900 mb-5">
                        1. Your Details
                      </h2>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-blue-900">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b-2 border-gray-300 pb-2 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-400"
                            placeholder="John"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-blue-900">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b-2 border-gray-300 pb-2 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-400"
                            placeholder="Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-blue-900">
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b-2 border-gray-300 pb-2 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-400"
                            placeholder="+91 7011668984"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-blue-900">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b-2 border-gray-300 pb-2 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-400"
                            placeholder="john@company.com"
                          />
                        </div>
                        <div className="space-y-2 col-span-2">
                          <label className="text-sm font-medium text-blue-900">
                            Company Name
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b-2 border-gray-300 pb-2 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-400"
                            placeholder="Your Company"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Project Info */}
                  {step === 2 && (
                    <div className="space-y-5">
                      <h2 className="text-lg font-semibold text-gray-900 mb-5">
                        2. Project Info
                      </h2>

                      <div className="space-y-5">
                        <div className="space-y-2 relative dropdown-container">
                          <label className="text-sm font-medium text-blue-900">
                            What are you looking for?
                          </label>
                          <input
                            type="hidden"
                            name="lookingFor"
                            value={formData.lookingFor}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setShowLookingForDropdown(
                                !showLookingForDropdown
                              );
                              setShowBudgetDropdown(false);
                            }}
                            className={`w-full bg-transparent border-b-2 border-gray-300 pb-2 text-left text-gray-900 focus:outline-none focus:border-blue-600 transition-colors flex items-center justify-between ${
                              !formData.lookingFor && submitStatus === "error"
                                ? "border-red-500"
                                : ""
                            }`}
                          >
                            <span
                              className={
                                formData.lookingFor
                                  ? "text-gray-900"
                                  : "text-gray-400"
                              }
                            >
                              {formData.lookingFor || "Select service"}
                            </span>
                            <span className="text-gray-400">▼</span>
                          </button>
                          {showLookingForDropdown && (
                            <div className="absolute z-10 w-full mt-1 rounded-lg bg-white border-2 border-blue-100 max-h-60 overflow-y-auto shadow-xl">
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
                                    setFormData({
                                      ...formData,
                                      lookingFor: option,
                                    });
                                    setShowLookingForDropdown(false);
                                    if (submitStatus === "error")
                                      setSubmitStatus(null);
                                  }}
                                  className="w-full px-4 py-3 text-left text-gray-900 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="space-y-2 relative dropdown-container">
                          <label className="text-sm font-medium text-blue-900">
                            Budget
                          </label>
                          <input
                            type="hidden"
                            name="budget"
                            value={formData.budget}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setShowBudgetDropdown(!showBudgetDropdown);
                              setShowLookingForDropdown(false);
                            }}
                            className={`w-full bg-transparent border-b-2 border-gray-300 pb-2 text-left text-gray-900 focus:outline-none focus:border-blue-600 transition-colors flex items-center justify-between ${
                              !formData.budget && submitStatus === "error"
                                ? "border-red-500"
                                : ""
                            }`}
                          >
                            <span
                              className={
                                formData.budget
                                  ? "text-gray-900"
                                  : "text-gray-400"
                              }
                            >
                              {formData.budget || "Select budget"}
                            </span>
                            <span className="text-gray-400">▼</span>
                          </button>
                          {showBudgetDropdown && (
                            <div className="absolute z-10 w-full mt-1 rounded-lg bg-white border-2 border-blue-100 shadow-xl">
                              {[
                                "1L - 2L",
                                "2L - 3L",
                                "3L - 5L",
                                "5L - 10L",
                                "Other",
                              ].map((option) => (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => {
                                    setFormData({
                                      ...formData,
                                      budget: option,
                                    });
                                    setShowBudgetDropdown(false);
                                    if (submitStatus === "error")
                                      setSubmitStatus(null);
                                  }}
                                  className="w-full px-4 py-3 text-left text-gray-900 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation buttons */}
                  <div className="flex items-center justify-between mt-6">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="text-gray-600 hover:text-blue-900 transition-colors font-medium text-sm"
                      >
                        ← Back
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 2 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-8 py-2.5 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl text-sm"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-2.5 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>
                    )}
                  </div>

                  {/* Status messages */}
                  {submitStatus === "success" && (
                    <p className="text-green-600 text-sm text-center mt-4 font-medium">
                      ✓ Message sent successfully!
                    </p>
                  )}
                  {submitStatus === "error" && (
                    <p className="text-red-600 text-sm text-center mt-4 font-medium">
                      ✗{" "}
                      {errorMessage ||
                        "Please fill all required fields and try again."}
                    </p>
                  )}
                </form>
              </div>
            </div>

            {/* Right Side - Contact Info and Video */}
            <div className="lg:sticky lg:top-32 flex flex-col h-full">
              {/* Support text - Top */}
              <div className="mb-8">
                <p className="text-xl lg:text-2xl text-blue-900 leading-relaxed font-semibold">
                  Whether you have a question or need support, we're here to
                  help.
                </p>
              </div>

              {/* Contact Info - Middle */}
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-blue-900 font-bold mb-3 text-base">
                    Phone
                  </h3>
                  <a
                    href="tel:+917011668984"
                    className="text-blue-700 hover:text-blue-900 transition-colors block mb-2 text-base"
                  >
                    Help Desk - +91 7011668984
                  </a>
                  <a
                    href="tel:+918930410212"
                    className="text-blue-700 hover:text-blue-900 transition-colors block text-base"
                  >
                    Founder Office - +91 8930410212
                  </a>
                </div>
                <div>
                  <h3 className="text-blue-900 font-bold mb-3 text-base">
                    Email
                  </h3>
                  <a
                    href="mailto:hello@mockvel.com"
                    className="text-blue-700 hover:text-blue-900 transition-colors text-base"
                  >
                    hello@mockvel.com
                  </a>
                </div>
                <div>
                  <h3 className="text-blue-900 font-bold mb-3 text-base">
                    Address
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-blue-900 font-bold text-sm mb-1">
                        REWARI
                      </p>
                      <p className="text-blue-700 text-base">
                        office no. 4, Garhi Bolni Rd, opp. Eden Gardens, 123401
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-900 font-bold text-sm mb-1">
                        GURUGRAM
                      </p>
                      <p className="text-blue-700 text-base">
                        2nd floor, Plot No, 90, IDC, DLF Colony, Sector 14,
                        122007
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Character - Bottom Right */}
              <div className="flex justify-start mt-auto">
                <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border-4 border-blue-200 bg-blue-50 p-4">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto object-cover rounded-2xl"
                  >
                    <source
                      src="https://www.yakk.com.au/wp-content/uploads/2025/08/Yak-Wave-Refined-and-Cropped-1.webm"
                      type="video/webm"
                    />
                  </video>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Section */}
          <div className="mt-20 space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 text-center mb-12">
              Our Offices
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* REWARI Office Map */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-900">
                  REWARI Office
                </h3>
                <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-blue-200 aspect-video">
                  <iframe
                    src="https://www.google.com/maps?q=office+no.+4,+Garhi+Bolni+Rd,+opp.+Eden+Gardens,+Rewari,+Haryana+123401&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="REWARI Office"
                  />
                </div>
                <p className="text-blue-700 text-sm">
                  office no. 4, Garhi Bolni Rd, opp. Eden Gardens, 123401
                </p>
              </div>

              {/* GURUGRAM Office Map */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-900">
                  GURUGRAM Office
                </h3>
                <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-blue-200 aspect-video">
                  <iframe
                    src="https://www.google.com/maps?q=Plot+No+90,+IDC,+DLF+Colony,+Sector+14,+Gurugram,+Haryana+122007&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="GURUGRAM Office"
                  />
                </div>
                <p className="text-blue-700 text-sm">
                  2nd floor, Plot No, 90, IDC, DLF Colony, Sector 14, 122007
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
