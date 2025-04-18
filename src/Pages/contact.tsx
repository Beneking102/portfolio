import React, { useState, useEffect, useCallback } from "react";
import { Send, User, Mail, Phone, MessageSquare, Paperclip } from "lucide-react";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  attachment: File | null;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    attachment: null
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  const validateField = useCallback((field: keyof FormData, value: string) => {
    let error = "";
    if (field === "email" && value) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(value)) error = "Ungültige E-Mail-Adresse";
    }
    if ((field === "name" || field === "message") && !value.trim()) {
      error = "Pflichtfeld";
    }
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      validateField(name as keyof FormData, value);
    },
    [validateField]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, attachment: file }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Object.entries(formData).forEach(([key, val]) => validateField(key as keyof FormData, String(val)));
    if (Object.values(errors).some(msg => msg)) return;
    setIsSubmitting(true);
    Swal.fire({ title: 'Sende...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    try {
      const data = new FormData(e.currentTarget);
      if (formData.attachment) data.append('attachment', formData.attachment);
      await fetch(e.currentTarget.action, { method: e.currentTarget.method, body: data });
      Swal.fire({ title: 'Erfolgreich!', icon: 'success', confirmButtonColor: '#22c55e', timer: 2000 });
      setFormData({ name: "", email: "", phone: "", message: "", attachment: null });
      setErrors({});
    } catch {
      Swal.fire({ title: 'Fehler', text: 'Senden fehlgeschlagen.', icon: 'error', confirmButtonColor: '#22c55e' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative md:px-10 px-5 py-16 overflow-hidden" id="Contact">
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400 text-center mb-4">
          Kontakt
        </h2>
        <p className="text-center text-gray-300 mb-8" data-aos="fade-up" data-aos-delay="200">
          Fragen oder Anliegen? Melde dich gerne bei mir!
        </p>
        <motion.form
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 grid gap-6"
          onSubmit={handleSubmit}
          action="https://formsubmit.co/contact@benedikt-pkr.info"
          method="POST"
          encType="multipart/form-data"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />

          <div className="relative" data-aos="fade-up" data-aos-delay="400">
            <User className="absolute left-4 top-4 w-5 h-5 text-green-400" />
            <input
              type="text"
              name="name"
              placeholder="Name*"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full p-4 pl-12 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-0"
              required
            />
            {errors.name && <span className="text-sm text-red-500 mt-1 block">{errors.name}</span>}
          </div>

          <div className="relative" data-aos="fade-up" data-aos-delay="500">
            <Mail className="absolute left-4 top-4 w-5 h-5 text-green-400" />
            <input
              type="email"
              name="email"
              placeholder="E-Mail*"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full p-4 pl-12 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-0"
              required
            />
            {errors.email && <span className="text-sm text-red-500 mt-1 block">{errors.email}</span>}
          </div>

          <div className="relative" data-aos="fade-up" data-aos-delay="600">
            <Phone className="absolute left-4 top-4 w-5 h-5 text-green-400" />
            <input
              type="tel"
              name="phone"
              placeholder="Tel. (optional)"
              value={formData.phone}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full p-4 pl-12 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-0"
            />
          </div>

          <div className="relative" data-aos="fade-up" data-aos-delay="700">
            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-green-400" />
            <textarea
              name="message"
              placeholder="Deine Nachricht*"
              value={formData.message}
              onChange={handleChange}
              maxLength={500}
              disabled={isSubmitting}
              className="w-full h-32 p-4 pl-12 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-0 resize-none"
              required
            />
            {errors.message && <span className="text-sm text-red-500 mt-1 block">{errors.message}</span>}
            <span className="text-sm text-gray-300 mt-1 block text-right">{formData.message.length}/500</span>
          </div>

          <div className="relative" data-aos="fade-up" data-aos-delay="800">
            <Paperclip className="absolute left-4 top-4 w-5 h-5 text-green-400" />
            <input
              type="file"
              name="attachment"
              onChange={handleFileChange}
              disabled={isSubmitting}
              className="w-full p-4 pl-12 bg-transparent border border-white/20 rounded-lg text-white focus:border-green-400 focus:ring-0"
            />
            {formData.attachment && <span className="text-sm text-gray-300 mt-1 block">Ausgewählt: {formData.attachment.name}</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="relative group w-full inline-flex items-center justify-center gap-2 py-4 rounded-lg font-semibold text-white overflow-hidden"
            data-aos="fade-up"
            data-aos-delay="900"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-teal-400 rounded-lg opacity-50 blur group-hover:opacity-80 transition-all"></div>
            <span className="relative flex items-center gap-2 z-10">
              {isSubmitting ? "Sendet..." : "Senden"} <Send className="w-5 h-5 text-green-400" />
            </span>
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactPage;
