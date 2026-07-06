import React, { useState } from "react";
import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitch,
  Twitter,
  X,
} from "lucide-react";
import emailjs from "@emailjs/browser";

import "./ContactSection.css";

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm(
        "service_9mmjcge",        // EmailJS Service ID
        "template_wynb5kc",       // EmailJS Template ID
        e.target,                 // Form element
        "gNzwjp2xSRH6Nl2F1"       // Public Key
      )
      .then(
        () => {
          setIsSubmitting(false);
          setAlertVisible(true);  // Show success alert
          e.target.reset();       // Clear form

          // Hide alert after 4 seconds
          setTimeout(() => setAlertVisible(false), 4000);
        },
        (error) => {
          alert("❌ Failed to send message. Please try again.");
          console.error("EmailJS Error:", error);
          setIsSubmitting(false);
        }
      );
  };

  return (
    <section id="contact" className="contact-section">
      {/* Floating success alert */}
      {alertVisible && (
        <div className="popup-alert fixed-alert" role="alert">
          <div className="custom-alert-content">
            <strong className="custom-alert-title">Success!</strong>
            <span className="custom-alert-description">
              Your message was sent successfully.
            </span>
          </div>
          <button
            className="custom-alert-close"
            onClick={() => setAlertVisible(false)}
            aria-label="Close alert"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="contact-container">
        <h2 className="contact-heading">
          Get In <span>Touch</span>
        </h2>
        <p className="contact-subtext">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <div className="contact-info">
            <h3>Contact Information</h3>

            <div className="contact-info-item">
              <div className="contact-icon-box">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <div className="contact-info-label">Email</div>
                <div className="contact-info-value">
                  <a href="mailto:v1gneashm007@gmail.com">v1gneashm007@gmail.com</a>
                </div>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon-box">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <div className="contact-info-label">Phone</div>
                <div className="contact-info-value">
                  <a href="tel:+917907957232">+91 79079 57232</a>
                </div>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon-box">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <div className="contact-info-label">Location</div>
                <div className="contact-info-value">
                  <a>Coimbatore, Tamil Nadu, India</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="contact-form-container">
            <h3>Send a Message</h3>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  required
                  placeholder="M. Vigneash"
                />
              </div>

              <div>
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  required
                  placeholder="vigneash@example.com"
                />
              </div>

              <div>
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Hello, I'd like to discuss..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="contact-submit-button"
              >
                {isSubmitting ? "Sending..." : "Send Message"} <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
