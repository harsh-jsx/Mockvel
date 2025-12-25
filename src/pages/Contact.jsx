import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import emailjs from "@emailjs/browser";
import CursorFollowingOwl from "../components/CursorFollowingOwl";

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
    let ctx = null;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      try {
        ctx = gsap.context(() => {
          // Animate heading
          if (headingRef.current) {
            const words = headingRef.current.querySelectorAll(".word");
            if (words && words.length > 0) {
              gsap.from(words, {
                y: 100,
                opacity: 0,
                rotateX: -45,
                duration: 1.2,
                stagger: 0.15,
                ease: "power4.out",
              });
            }
          }

          // Animate form
          if (formRef.current) {
            gsap.from(formRef.current, {
              y: 60,
              opacity: 0,
              duration: 1,
              delay: 0.5,
              ease: "power3.out",
            });
          }
        });
      } catch (error) {
        console.error("GSAP animation error:", error);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
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
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Navigation */}

      {/* Background elements - LaptopVideo gradient */}
      <div className="absolute inset-0 pointer-events-none">
        {/* MOBILE GRADIENT (lightweight, always visible) */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 40%, hsl(270 100% 60% / 0.35), transparent 70%)",
          }}
        />

        {/* DESKTOP GRADIENTS */}
        <div className="hidden md:block">
          {/* Top glow */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-40 w-[900px] h-[400px] blur-[120px] opacity-60 bg-purple-600" />

          {/* Left glow */}
          <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[400px] h-[600px] blur-[100px] opacity-60 bg-fuchsia-600" />

          {/* Right glow */}
          <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[400px] h-[600px] blur-[100px] opacity-60 bg-indigo-600" />
        </div>
      </div>

      <div className="relative z-10 pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div ref={headingRef} className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-primary-foreground/50" />
              <span className="text-primary-foreground/70 text-sm tracking-[0.2em] uppercase">
                Get in Touch
              </span>
            </div>
            <div className="overflow-hidden">
              <h1 className="word font-display text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.9] text-primary-foreground">
                Let's talk.
              </h1>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-[1fr,400px] gap-12 lg:gap-5 items-start">
            {/* Form Card */}
            <div ref={formRef}>
              <div className="bg-card rounded-3xl p-6 lg:p-8 border border-border/20">
                {/* Step indicator */}
                <div className="flex items-center gap-2 mb-6">
                  {[1, 2].map((s) => (
                    <div
                      key={s}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        s <= step ? "bg-primary" : "bg-border"
                      }`}
                    />
                  ))}
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Your Details */}
                  {step === 1 && (
                    <div className="space-y-5">
                      <h2 className="text-lg font-semibold text-foreground">
                        1. Your Details
                      </h2>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-sm text-primary">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-border/50 pb-2 text-foreground focus:outline-none focus:border-primary transition-colors"
                            placeholder="John"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm text-primary">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-border/50 pb-2 text-foreground focus:outline-none focus:border-primary transition-colors"
                            placeholder="Doe"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm text-primary">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-border/50 pb-2 text-foreground focus:outline-none focus:border-primary transition-colors"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm text-primary">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-border/50 pb-2 text-foreground focus:outline-none focus:border-primary transition-colors"
                            placeholder="john@company.com"
                          />
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                          <label className="text-sm text-primary">
                            Company Name
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-border/50 pb-2 text-foreground focus:outline-none focus:border-primary transition-colors"
                            placeholder="Your Company"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Project Info */}
                  {step === 2 && (
                    <div className="space-y-5">
                      <h2 className="text-lg font-semibold text-foreground">
                        2. Project Info
                      </h2>

                      <div className="space-y-4">
                        <div className="space-y-1.5 relative dropdown-container">
                          <label className="text-sm text-primary">
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
                            className={`w-full bg-transparent border-b border-border/50 pb-2 text-left text-foreground focus:outline-none focus:border-primary transition-colors flex items-center justify-between ${
                              !formData.lookingFor && submitStatus === "error"
                                ? "border-red-500/50"
                                : ""
                            }`}
                          >
                            <span
                              className={
                                formData.lookingFor
                                  ? "text-foreground"
                                  : "text-foreground/50"
                              }
                            >
                              {formData.lookingFor || "Select service"}
                            </span>
                            <span className="text-foreground/50">▼</span>
                          </button>
                          {showLookingForDropdown && (
                            <div className="absolute z-10 w-full mt-1 rounded-lg bg-card border border-border/50 max-h-60 overflow-y-auto shadow-lg">
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
                                  className="w-full px-4 py-2 text-left text-foreground hover:bg-primary/10 transition-colors"
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="space-y-1.5 relative dropdown-container">
                          <label className="text-sm text-primary">Budget</label>
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
                            className={`w-full bg-transparent border-b border-border/50 pb-2 text-left text-foreground focus:outline-none focus:border-primary transition-colors flex items-center justify-between ${
                              !formData.budget && submitStatus === "error"
                                ? "border-red-500/50"
                                : ""
                            }`}
                          >
                            <span
                              className={
                                formData.budget
                                  ? "text-foreground"
                                  : "text-foreground/50"
                              }
                            >
                              {formData.budget || "Select budget"}
                            </span>
                            <span className="text-foreground/50">▼</span>
                          </button>
                          {showBudgetDropdown && (
                            <div className="absolute z-10 w-full mt-1 rounded-lg bg-card border border-border/50 shadow-lg">
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
                                  className="w-full px-4 py-2 text-left text-foreground hover:bg-primary/10 transition-colors"
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
                        className="text-muted-foreground hover:text-foreground transition-colors"
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
                        className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>
                    )}
                  </div>

                  {/* Status messages */}
                  {submitStatus === "success" && (
                    <p className="text-green-400 text-sm text-center mt-4">
                      ✓ Message sent successfully!
                    </p>
                  )}
                  {submitStatus === "error" && (
                    <p className="text-red-400 text-sm text-center mt-4 animate-pulse">
                      ✗{" "}
                      {errorMessage ||
                        "Please fill all required fields and try again."}
                    </p>
                  )}
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-32 space-y-12">
              {/* Support text */}
              <div>
                <p className="text-xl lg:text-2xl text-primary-foreground/90 leading-relaxed font-display italic">
                  Whether you have a question or need support, we're here to
                  help.
                </p>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-primary-foreground font-semibold mb-2">
                      Phone
                    </h3>
                    <p className="text-primary-foreground/70">
                      +1 (555) 123-4567
                    </p>
                  </div>
                  <div>
                    <h3 className="text-primary-foreground font-semibold mb-2">
                      Email
                    </h3>
                    <a
                      href="mailto:hello@studio.com"
                      className="text-primary-foreground/70 hover:underline"
                    >
                      hello@studio.com
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="text-primary-foreground font-semibold mb-2">
                    Address
                  </h3>
                  <p className="text-primary-foreground/70">
                    123 Creative Ave
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>

              {/* Owl Character */}
              <div className="flex justify-center lg:justify-end mt-8">
                <CursorFollowingOwl />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
