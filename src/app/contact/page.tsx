"use client";
import Footer from "@/components/Footer";
import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', interest: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', interest: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main className="pt-24 min-h-screen relative">
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute inset-0 bg-[#ede9e0]"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-multiply"
          style={{ backgroundImage: "url('/images/contact-bg.png')" }}
        ></div>
      </div>

      <section className="py-20 px-6 sm:px-8 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Contact Info */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[#4a5240]/30"></div>
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#4a5240] uppercase">Contact Us</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-serif text-[#161f18] mb-6">Let's Build Your Future</h1>
            <p className="text-gray-600 mb-12 max-w-md leading-relaxed">
              Whether you're looking to invest, buy a home, or learn more about our projects, our team is here to help.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#4a5240]/10 flex items-center justify-center text-[#4a5240] shrink-0">
                  <i className="fa-brands fa-whatsapp text-xl"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#161f18] uppercase tracking-wider mb-1">WhatsApp</h4>
                  <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-[#4a5240] transition-colors">+92 300 1234 567</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#4a5240]/10 flex items-center justify-center text-[#4a5240] shrink-0">
                  <i className="fa-solid fa-phone text-xl"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#161f18] uppercase tracking-wider mb-1">Phone</h4>
                  <a href="tel:+92992123456" className="text-gray-600 hover:text-[#4a5240] transition-colors">+92 992 123 456</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#4a5240]/10 flex items-center justify-center text-[#4a5240] shrink-0">
                  <i className="fa-solid fa-envelope text-xl"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#161f18] uppercase tracking-wider mb-1">Email</h4>
                  <a href="mailto:info@romanbuilders.com" className="text-gray-600 hover:text-[#4a5240] transition-colors">info@romanbuilders.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#4a5240]/10 flex items-center justify-center text-[#4a5240] shrink-0">
                  <i className="fa-solid fa-location-dot text-xl"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#161f18] uppercase tracking-wider mb-1">Location</h4>
                  <p className="text-gray-600">Main Mansehra Road, near Supply<br/>Abbottabad, Hazara Division, KPK</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#4a5240] text-white flex items-center justify-center hover:bg-[#3d4435] transition-colors"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#4a5240] text-white flex items-center justify-center hover:bg-[#3d4435] transition-colors"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#4a5240] text-white flex items-center justify-center hover:bg-[#3d4435] transition-colors"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-serif text-[#161f18] mb-6">Send an Inquiry</h3>
              
              {status === 'success' ? (
                <div className="bg-emerald-50 text-emerald-800 p-6 rounded-2xl border border-emerald-100 text-center">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fa-solid fa-check text-xl"></i>
                  </div>
                  <h4 className="font-bold mb-2">Message Sent Successfully!</h4>
                  <p className="text-sm">Thank you for reaching out. Our team will get back to you shortly.</p>
                  <button onClick={() => setStatus('idle')} className="mt-4 text-emerald-700 text-sm font-medium hover:underline">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                      <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-[#f8f7f4] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5240]/50 transition-all" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
                      <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-[#f8f7f4] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5240]/50 transition-all" placeholder="+92 300 0000000" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                    <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-[#f8f7f4] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5240]/50 transition-all" placeholder="john@example.com" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Area of Interest</label>
                    <select name="interest" value={formData.interest} onChange={handleChange} className="w-full bg-[#f8f7f4] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5240]/50 transition-all text-gray-700">
                      <option value="">Select an option</option>
                      <option value="Prime View">Prime View Co-Operative Housing Society</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Investment">Investment Opportunities</option>
                      <option value="Careers">Careers</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message</label>
                    <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full bg-[#f8f7f4] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a5240]/50 transition-all resize-none" placeholder="How can we help you?"></textarea>
                  </div>

                  {status === 'error' && (
                    <div className="text-red-500 text-sm font-medium">Failed to send message. Please try again.</div>
                  )}

                  <button disabled={status === 'submitting'} type="submit" className="w-full bg-[#4a5240] text-white py-4 rounded-xl font-medium hover:bg-[#3d4435] transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-70">
                    {status === 'submitting' ? (
                      <span className="flex items-center gap-2"><i className="fa-solid fa-circle-notch fa-spin"></i> Sending...</span>
                    ) : (
                      <span className="flex items-center gap-2">Submit Inquiry <i className="fa-solid fa-paper-plane text-xs"></i></span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
