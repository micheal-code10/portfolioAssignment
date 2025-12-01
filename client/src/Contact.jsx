import { useState } from "react";
import api from "../api";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      await api.post("/contacts", form);
      setStatus("Message sent!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("Error sending message");
    }
  };

  return (
    <section>
      <h2>Contact Me</h2>
      {status && <p>{status}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
        />
        <button type="submit">Send</button>
      </form>
    </section>
  );
};

export default Contact;



