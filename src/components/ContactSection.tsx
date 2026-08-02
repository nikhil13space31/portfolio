import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Check, Copy, MessageSquare, Sparkles, Send, MapPin, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'GeoAI Collaboration', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('nikhilsatyavardhan@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      // 1. Save submission into Supabase database table
      const { error: supabaseError } = await supabase.from('contact_submissions').insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      ]);

      if (supabaseError) {
        console.warn('Supabase insert note:', supabaseError.message);
      }

      // 2. Send instant email via Web3Forms if VITE_WEB3FORMS_KEY is configured
      const web3FormsKey = import.meta.env.VITE_WEB3FORMS_KEY;
      if (web3FormsKey) {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: web3FormsKey,
            name: formData.name,
            email: formData.email,
            subject: `[Portfolio] ${formData.subject} - ${formData.name}`,
            message: formData.message,
          }),
        });
      }

      // 3. Send instant formatted alert to Discord Webhook
      const discordUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
      if (discordUrl) {
        await fetch(discordUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: 'Portfolio Bot',
            embeds: [
              {
                title: `📬 New Portfolio Message: ${formData.subject}`,
                color: 65382,
                fields: [
                  { name: 'Name', value: formData.name, inline: true },
                  { name: 'Email', value: formData.email, inline: true },
                  { name: 'Topic', value: formData.subject, inline: false },
                  { name: 'Message', value: formData.message, inline: false },
                ],
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        });
      }
    } catch (err: any) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="mb-12">
      <div className="flex items-center gap-4 mb-12">
        <h3 className="text-3xl font-mono font-bold">05. Reach Out</h3>
        <div className="h-px bg-border flex-1"></div>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Information & Social Cards */}
        <div className="md:col-span-5 space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Interested in geospatial AI models, remote sensing pipelines, or research collaboration? Send me a message or connect directly.
          </p>

          {/* Availability Badge */}
          <div className="p-4 border border-primary/30 bg-primary/5 flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="font-mono text-xs text-primary font-medium">
              Open for AI/ML & Geo-Informatics Opportunities
            </span>
          </div>

          {/* Direct Email */}
          <div className="border border-border p-5 bg-muted/10 hover:border-primary/50 transition-colors">
            <div className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">Direct Email</div>
            <div className="flex items-center justify-between gap-2 mt-1">
              <span className="font-mono text-sm font-semibold truncate text-foreground">nikhilsatyavardhan@gmail.com</span>
              <button
                onClick={handleCopyEmail}
                className="p-2 border border-border hover:border-primary hover:text-primary transition-colors flex items-center gap-1 font-mono text-xs cursor-pointer shrink-0"
                title="Copy Email"
              >
                {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* GitHub Repository */}
          <a
            href="https://github.com/nikhil13space31"
            target="_blank"
            rel="noreferrer"
            className="border border-border p-5 bg-muted/10 hover:border-primary transition-colors flex items-center justify-between group"
          >
            <div>
              <div className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">GitHub Profile</div>
              <div className="font-mono text-sm font-semibold group-hover:text-primary transition-colors flex items-center gap-2">
                github.com/nikhil13space31 <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="p-2 border border-border group-hover:border-primary text-muted-foreground group-hover:text-primary transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.082.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            </div>
          </a>

          {/* LinkedIn Profile */}
          <a
            href="https://www.linkedin.com/in/nikhil-satya-vardhan-kada/"
            target="_blank"
            rel="noreferrer"
            className="border border-border p-5 bg-muted/10 hover:border-primary transition-colors flex items-center justify-between group"
          >
            <div>
              <div className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">LinkedIn Profile</div>
              <div className="font-mono text-sm font-semibold group-hover:text-primary transition-colors flex items-center gap-2">
                nikhil-satya-vardhan-kada <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="p-2 border border-border group-hover:border-primary text-muted-foreground group-hover:text-primary transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </div>
          </a>

          {/* Location & Geo Coordinates */}
          <div className="border border-border p-5 bg-muted/10">
            <div className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">Location & Coordinates</div>
            <div className="font-mono text-sm font-semibold text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Kakinada, Andhra Pradesh, India
            </div>
            <div className="font-mono text-xs text-primary/80 mt-2">
              [LAT: 16.9891° N | LON: 82.2475° E]
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7">
          <div className="border border-border p-6 md:p-8 bg-muted/10 relative">
            <h4 className="text-xl font-mono font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" /> Direct Communication Pipeline
            </h4>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center border border-primary/40 bg-primary/10 space-y-4"
              >
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h5 className="font-mono text-xl font-bold text-primary">Message Received!</h5>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Thank you! You will hear from me soon.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'GeoAI Collaboration', message: '' });
                  }}
                  className="px-4 py-2 border border-border text-xs font-mono hover:border-primary hover:text-primary transition-colors mt-2 cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="p-3 border border-red-500/50 bg-red-500/10 text-red-400 text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {errorMsg}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Alex Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-background border border-border px-4 py-3 text-sm font-sans focus:outline-none focus:border-primary text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-background border border-border px-4 py-3 text-sm font-sans focus:outline-none focus:border-primary text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase">Topic / Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-background border border-border px-4 py-3 text-sm font-sans focus:outline-none focus:border-primary text-foreground cursor-pointer"
                  >
                    <option value="GeoAI Collaboration">GeoAI / Deep Learning Collaboration</option>
                    <option value="Job / Internship Opportunity">Job / Internship Opportunity</option>
                    <option value="GIS & UAV Query">GIS & UAV Data Processing Query</option>
                    <option value="General Inquiry">General Networking / Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your project, inquiry, or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-background border border-border px-4 py-3 text-sm font-sans focus:outline-none focus:border-primary text-foreground resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-primary text-primary-foreground font-mono font-bold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
