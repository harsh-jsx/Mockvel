import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import CursorFollowingOwl from "../components/CursorFollowingOwl";

const Contact = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    businessName: "",
    website: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const headingRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".word");
        gsap.from(words, {
          y: 100,
          opacity: 0,
          rotateX: -45,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
        });
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

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
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
                  {[1, 2, 3].map((s) => (
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
                        <div className="space-y-1.5">
                          <label className="text-sm text-primary">
                            Business Name
                          </label>
                          <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-border/50 pb-2 text-foreground focus:outline-none focus:border-primary transition-colors"
                            placeholder="Your Company"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm text-primary">
                            Website
                          </label>
                          <input
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-border/50 pb-2 text-foreground focus:outline-none focus:border-primary transition-colors"
                            placeholder="yourcompany.com"
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
                        <div className="space-y-1.5">
                          <label className="text-sm text-primary">
                            Project Type
                          </label>
                          <select
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-border/50 pb-2 text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
                          >
                            <option value="" className="bg-card">
                              Select project type
                            </option>
                            <option value="website" className="bg-card">
                              Website Design
                            </option>
                            <option value="branding" className="bg-card">
                              Branding
                            </option>
                            <option value="video" className="bg-card">
                              Video Production
                            </option>
                            <option value="marketing" className="bg-card">
                              Digital Marketing
                            </option>
                            <option value="other" className="bg-card">
                              Other
                            </option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm text-primary">
                            Budget Range
                          </label>
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-border/50 pb-2 text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
                          >
                            <option value="" className="bg-card">
                              Select budget range
                            </option>
                            <option value="5k-10k" className="bg-card">
                              $5,000 - $10,000
                            </option>
                            <option value="10k-25k" className="bg-card">
                              $10,000 - $25,000
                            </option>
                            <option value="25k-50k" className="bg-card">
                              $25,000 - $50,000
                            </option>
                            <option value="50k+" className="bg-card">
                              $50,000+
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Message */}
                  {step === 3 && (
                    <div className="space-y-5">
                      <h2 className="text-lg font-semibold text-foreground">
                        3. Your Message
                      </h2>

                      <div className="space-y-1.5">
                        <label className="text-sm text-primary">
                          Tell us about your project
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full bg-transparent border border-border/50 rounded-xl p-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                          placeholder="Share your vision, goals, and any specific requirements..."
                        />
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

                    {step < 3 ? (
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
                        className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
                      >
                        Send Message
                      </button>
                    )}
                  </div>
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
