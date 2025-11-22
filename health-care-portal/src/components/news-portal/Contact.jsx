// ...existing code...
import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(""); // '', 'sending', 'success', 'error'

  const contact = {
    address: "123 Health St, Wellness City, 12345",
    phone: "(555) 123-4567",
    email: "support@healthportal.example",
    hours: "Mon–Fri 9:00 — 17:00",
  };

  const update = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("Please fill in name, email and message.");
      return;
    }
    if (!validEmail(form.email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    setStatus("sending");

    try {
      // Replace endpoint with your real API. This is a placeholder submit.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        // fallback: show error but keep form data
        setStatus("error");
      }
    } catch (err) {
      // network / dev environment: fallback to opening mail client
      const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(
        form.subject || "Contact from site"
      )}&body=${encodeURIComponent(`Name: ${form.name}\n\n${form.message}`)}`;
      window.location.href = mailto;
      setStatus("success");
    }
  };

  return (
    <div className="contact-root">
      <div className="contact-grid">
        <section className="contact-details">
          <h2>Contact Us</h2>
          <p className="muted">
            We're here to help — reach out by phone, email or message below.
          </p>
          <dl>
            <dt>Address</dt>
            <dd>{contact.address}</dd>
            <dt>Phone</dt>
            <dd>
              <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>
                {contact.phone}
              </a>
            </dd>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </dd>
            <dt>Hours</dt>
            <dd>{contact.hours}</dd>
          </dl>
        </section>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <label>
            Name
            <input name="name" value={form.name} onChange={update} required />
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={update}
              required
            />
          </label>

          <label>
            Subject
            <input name="subject" value={form.subject} onChange={update} />
          </label>

          <label>
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={update}
              rows="6"
              required
            />
          </label>

          <div className="form-actions">
            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>
            {status && status !== "sending" && (
              <p className={`status ${status === "success" ? "ok" : "err"}`}>
                {status === "success"
                  ? "Message sent — we will get back to you soon."
                  : status}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
