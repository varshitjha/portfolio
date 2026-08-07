import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Copy, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/Toast';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/config/email';

export const Contact: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('varshitjha17@gmail.com');
    setCopiedEmail(true);
    showToast('Email address copied to clipboard!', 'success');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+917250725745');
    setCopiedPhone(true);
    showToast('Phone number copied to clipboard!', 'success');
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill out all required fields.', 'warning');
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          reply_to: formData.email,
          user_name: formData.name,
          user_email: formData.email,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Portfolio Inquiry from ${formData.name}`,
          message: `Sender Name: ${formData.name}\nSender Email: ${formData.email}\n\nMessage:\n${formData.message}`,
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      setSubmitted(true);
      showToast('Message sent successfully! I will reply within 24h.', 'success');
    } catch (err) {
      console.error('EmailJS send error:', err);
      showToast('Error sending message. Please email varshitjha17@gmail.com directly.', 'warning');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-light)] px-3 py-1 rounded-full bg-[var(--color-accent-glow)] border border-[var(--color-accent)]/30 inline-block">
            // Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Let's Work Together
          </h2>
          <p className="text-base text-[var(--color-text-secondary)]">
            Open to internships, freelance projects, and engineering collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-400">Available for Opportunities</span>
              </div>

              <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                Got a project or opportunity in mind?
              </h3>

              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Whether you have a question, job opportunity, or project proposal — my inbox is always open.
              </p>

              {/* Direct Info List */}
              <div className="space-y-4 pt-2">
                {/* Email */}
                <div
                  onClick={handleCopyEmail}
                  className="flex items-center gap-4 p-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer group"
                >
                  <div className="p-2.5 rounded-lg bg-[var(--color-accent-glow)] text-[var(--color-accent-light)]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-xs text-[var(--color-text-muted)]">Email</span>
                    <span className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-light)]">
                      varshitjha17@gmail.com
                    </span>
                  </div>
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[var(--color-text-muted)]" />}
                </div>

                {/* Phone */}
                <div
                  onClick={handleCopyPhone}
                  className="flex items-center gap-4 p-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer group"
                >
                  <div className="p-2.5 rounded-lg bg-[var(--color-accent-glow)] text-[var(--color-accent-light)]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-xs text-[var(--color-text-muted)]">Phone</span>
                    <span className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-light)]">
                      +91 7250725745
                    </span>
                  </div>
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[var(--color-text-muted)]" />}
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)]">
                  <div className="p-2.5 rounded-lg bg-[var(--color-accent-glow)] text-[var(--color-accent-light)]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-[var(--color-text-muted)]">Location</span>
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">Gujarat, India 🇮🇳</span>
                  </div>
                </div>

                {/* Timezone */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)]">
                  <div className="p-2.5 rounded-lg bg-[var(--color-accent-glow)] text-[var(--color-accent-light)]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-[var(--color-text-muted)]">Timezone</span>
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">IST (UTC +5:30)</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-[var(--color-text-primary)]">Message Sent!</h4>
                  <p className="text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
                    Thank you for reaching out! I've received your inquiry and will reply within 24 hours.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-4">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono font-medium text-[var(--color-text-secondary)] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] focus:border-[var(--color-accent)] outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-medium text-[var(--color-text-secondary)] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] focus:border-[var(--color-accent)] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-[var(--color-text-secondary)] mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Internship opportunity / Project inquiry"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] focus:border-[var(--color-accent)] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-[var(--color-text-secondary)] mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project or opportunity..."
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] focus:border-[var(--color-accent)] outline-none transition-colors resize-none"
                    />
                  </div>

                  <Button variant="primary" size="lg" type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
