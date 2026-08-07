import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Copy, Check, Github, Linkedin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/Toast';
import emailjs from '@emailjs/browser';

export const ContactPanel: React.FC = () => {
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
        'service_0ur7tki',
        'template_xjy3xv3',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || 'Portfolio Inquiry',
          message: formData.message,
        },
        'nh-399kvCkQg5ZXqu'
      );
      setSubmitted(true);
      showToast('Message sent! I will respond within 24 hours.', 'success');
    } catch (err) {
      console.error('EmailJS error:', err);
      showToast('Error sending message. Please email varshitjha17@gmail.com directly.', 'warning');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-light)] px-3 py-1 rounded-full bg-[var(--color-accent-glow)] border border-[var(--color-accent)]/30 inline-block">
          // Contact &amp; Hire Surface
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Let's Build Together
        </h2>
        <p className="text-base text-[var(--color-text-secondary)]">
          Direct contact channels, single-click copy buttons, and an active inbox form.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Copy Info */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-semibold text-emerald-400">Available for Opportunities</span>
            </div>

            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
              Got a project or engineering role?
            </h3>

            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Open to internships, junior developer roles, and freelance projects.
            </p>

            <div className="space-y-3 pt-2">
              {/* Copy Email */}
              <div
                onClick={handleCopyEmail}
                className="flex items-center gap-4 p-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-[var(--color-accent-glow)] text-[var(--color-accent-light)]">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="block text-[10px] text-[var(--color-text-muted)] font-mono uppercase">Email</span>
                  <span className="text-xs font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-light)]">
                    varshitjha17@gmail.com
                  </span>
                </div>
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[var(--color-text-muted)]" />}
              </div>

              {/* Copy Phone */}
              <div
                onClick={handleCopyPhone}
                className="flex items-center gap-4 p-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-[var(--color-accent-glow)] text-[var(--color-accent-light)]">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="block text-[10px] text-[var(--color-text-muted)] font-mono uppercase">Phone</span>
                  <span className="text-xs font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-light)]">
                    +91 7250725745
                  </span>
                </div>
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[var(--color-text-muted)]" />}
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 p-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)]">
                <div className="p-2 rounded-lg bg-[var(--color-accent-glow)] text-[var(--color-accent-light)]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-[var(--color-text-muted)] font-mono uppercase">Location</span>
                  <span className="text-xs font-medium text-[var(--color-text-primary)]">Gujarat, India 🇮🇳</span>
                </div>
              </div>

              {/* Timezone */}
              <div className="flex items-center gap-4 p-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)]">
                <div className="p-2 rounded-lg bg-[var(--color-accent-glow)] text-[var(--color-accent-light)]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-[var(--color-text-muted)] font-mono uppercase">Timezone</span>
                  <span className="text-xs font-medium text-[var(--color-text-primary)]">IST (UTC +5:30)</span>
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
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-bold text-[var(--color-text-primary)]">Message Sent!</h4>
                <p className="text-xs text-[var(--color-text-secondary)] max-w-md mx-auto">
                  Thank you for reaching out! Your message was received and I will reply within 24 hours.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-4">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-medium text-[var(--color-text-secondary)] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] focus:border-[var(--color-accent)] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-medium text-[var(--color-text-secondary)] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="yourname@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] focus:border-[var(--color-accent)] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-[var(--color-text-secondary)] mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Internship opportunity / Project inquiry"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] focus:border-[var(--color-accent)] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-[var(--color-text-secondary)] mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] focus:border-[var(--color-accent)] outline-none transition-colors resize-none"
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
  );
};
