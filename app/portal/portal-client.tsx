"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Mail,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  LogOut,
  Send,
  Calendar,
  Phone,
  User,
  Inbox,
  Filter,
  CheckCircle,
  Clock,
  Sparkles,
  Loader2
} from "lucide-react";

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  concern: string;
  message: string;
  source: string;
  createdAt: string | null;
  lastFollowUpAt?: string | null;
  lastFollowUpType?: "whatsapp" | "email" | null;
};

type Followup = {
  id: string;
  type: "whatsapp" | "email";
  content: string;
  subject?: string;
  sentAt: string | null;
  sentBy: string;
};

type PortalClientProps = {
  sessionEmail: string;
};

export default function PortalClient({ sessionEmail }: PortalClientProps) {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSource, setFilterSource] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Accordion / Expanded Lead Details State
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);

  // Form composers per expanded lead
  const [whatsappDrafts, setWhatsappDrafts] = useState<Record<string, string>>({});
  const [emailSubjects, setEmailSubjects] = useState<Record<string, string>>({});
  const [emailDrafts, setEmailDrafts] = useState<Record<string, string>>({});

  // Follow-up Histories
  const [histories, setHistories] = useState<Record<string, Followup[]>>({});
  const [loadingHistories, setLoadingHistories] = useState<Record<string, boolean>>({});
  const [sendingEmail, setSendingEmail] = useState<Record<string, boolean>>({});
  const [loggingFollowup, setLoggingFollowup] = useState<Record<string, boolean>>({});

  // Fetch leads on mount
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portal/leads");
      if (!res.ok) throw new Error("Failed to fetch leads");
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Fetch history for a single lead when expanded
  const fetchHistory = async (leadId: string) => {
    setLoadingHistories((prev) => ({ ...prev, [leadId]: true }));
    try {
      const res = await fetch(`/api/portal/leads/${leadId}/followups`);
      if (!res.ok) throw new Error("Failed to fetch history");
      const data = await res.json();
      setHistories((prev) => ({ ...prev, [leadId]: data.followups || [] }));
    } catch (err) {
      console.error("Error fetching history:", err);
    } finally {
      setLoadingHistories((prev) => ({ ...prev, [leadId]: false }));
    }
  };

  // Toggle row expansion
  const toggleExpand = (lead: Lead) => {
    if (expandedLeadId === lead.id) {
      setExpandedLeadId(null);
    } else {
      setExpandedLeadId(lead.id);
      // Fetch history for this lead
      fetchHistory(lead.id);

      // Initialize drafts if not already initialized
      if (!whatsappDrafts[lead.id]) {
        const concernText = lead.concern ? lead.concern : "your request";
        setWhatsappDrafts((prev) => ({
          ...prev,
          [lead.id]: `Hi ${lead.name}, this is from Dr Divya's Skin & Hair Clinic. We received your inquiry regarding ${concernText} and would love to help you. Let us know a convenient time to connect!`,
        }));
      }

      if (!emailSubjects[lead.id]) {
        setEmailSubjects((prev) => ({
          ...prev,
          [lead.id]: `Follow-up: Your inquiry at Dr Divya's Skin & Hair Clinic`,
        }));
      }

      if (!emailDrafts[lead.id]) {
        const concernText = lead.concern ? lead.concern : "your skin and hair concern";
        setEmailDrafts((prev) => ({
          ...prev,
          [lead.id]: `Hi ${lead.name},\n\nThank you for reaching out to Dr Divya's Skin & Hair Clinic regarding ${concernText}.\n\nOur team has received your request:\n"${lead.message}"\n\nWe would be happy to schedule a personal consultation for you. Please let us know if you have any questions or when you would be available for a callback.\n\nWarm regards,\nDr Divya's Skin & Hair Clinic Team`,
        }));
      }
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    try {
      await fetch("/api/portal/auth/session", { method: "DELETE" });
      router.push("/portal/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Send Email Handler
  const handleSendEmail = async (lead: Lead) => {
    const subject = emailSubjects[lead.id];
    const message = emailDrafts[lead.id];
    if (!lead.email) {
      alert("This lead does not have an email address provided.");
      return;
    }
    if (!subject || !message) {
      alert("Subject and Message body are required.");
      return;
    }

    setSendingEmail((prev) => ({ ...prev, [lead.id]: true }));
    try {
      // 1. Send the email
      const emailRes = await fetch("/api/portal/followup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: lead.email,
          name: lead.name,
          subject,
          message,
        }),
      });

      if (!emailRes.ok) {
        const errData = await emailRes.json();
        throw new Error(errData.error || "Failed to send email");
      }

      // 2. Log in follow-up history
      const logRes = await fetch(`/api/portal/leads/${lead.id}/followups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "email",
          content: message,
          subject,
        }),
      });

      if (!logRes.ok) throw new Error("Email sent but failed to write follow-up log record.");

      alert("Email sent successfully!");
      fetchHistory(lead.id);
      fetchLeads(); // Refresh status badges
    } catch (err: any) {
      alert(`Error: ${err.message || "Failed to send email follow-up"}`);
    } finally {
      setSendingEmail((prev) => ({ ...prev, [lead.id]: false }));
    }
  };

  // Send WhatsApp (Click to chat) Handler
  const handleSendWhatsApp = async (lead: Lead) => {
    const text = whatsappDrafts[lead.id];
    if (!text) {
      alert("Please enter a WhatsApp message.");
      return;
    }

    setLoggingFollowup((prev) => ({ ...prev, [lead.id]: true }));
    try {
      // 1. Log follow-up in database
      const logRes = await fetch(`/api/portal/leads/${lead.id}/followups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "whatsapp",
          content: text,
        }),
      });

      if (!logRes.ok) throw new Error("Failed to write WhatsApp follow-up log.");

      // 2. Open WhatsApp in new tab
      // Clean phone number (leave only digits, handle formatting if necessary)
      const cleanPhone = lead.phone.replace(/\D/g, "");
      const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
      window.open(waUrl, "_blank");

      fetchHistory(lead.id);
      fetchLeads(); // Refresh status badges
    } catch (err: any) {
      alert(`Error: ${err.message || "Failed to log WhatsApp follow-up"}`);
    } finally {
      setLoggingFollowup((prev) => ({ ...prev, [lead.id]: false }));
    }
  };

  // Send Both channels
  const handleSendBoth = async (lead: Lead) => {
    const text = whatsappDrafts[lead.id];
    const subject = emailSubjects[lead.id];
    const emailMessage = emailDrafts[lead.id];

    if (!lead.email) {
      alert("This lead does not have an email address provided.");
      return;
    }
    if (!text || !subject || !emailMessage) {
      alert("All fields for both WhatsApp and Email are required.");
      return;
    }

    setSendingEmail((prev) => ({ ...prev, [lead.id]: true }));
    setLoggingFollowup((prev) => ({ ...prev, [lead.id]: true }));

    try {
      // 1. Send email and write email log
      const emailRes = await fetch("/api/portal/followup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: lead.email,
          name: lead.name,
          subject,
          message: emailMessage,
        }),
      });

      if (!emailRes.ok) {
        const errData = await emailRes.json();
        throw new Error(errData.error || "Email failed to send.");
      }

      await fetch(`/api/portal/leads/${lead.id}/followups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "email",
          content: emailMessage,
          subject,
        }),
      });

      // 2. Write WhatsApp log and open WhatsApp URL
      await fetch(`/api/portal/leads/${lead.id}/followups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "whatsapp",
          content: text,
        }),
      });

      const cleanPhone = lead.phone.replace(/\D/g, "");
      const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
      window.open(waUrl, "_blank");

      alert("Email sent and WhatsApp redirect opened successfully!");
      fetchHistory(lead.id);
      fetchLeads();
    } catch (err: any) {
      alert(`Error: ${err.message || "Failed to complete operations."}`);
    } finally {
      setSendingEmail((prev) => ({ ...prev, [lead.id]: false }));
      setLoggingFollowup((prev) => ({ ...prev, [lead.id]: false }));
    }
  };

  // Helper to format relative date/time
  const relativeTime = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    if (diffMs < 0) return "Just now"; // Handle potential server-client timezone drift

    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    return `${diffDays}d ago`;
  };

  // Memoized lists of unique Sources for filter dropdown
  const uniqueSources = useMemo(() => {
    const sources = leads.map((l) => l.source).filter(Boolean);
    return Array.from(new Set(sources));
  }, [leads]);

  // Real-time Search & Filter logic
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.concern.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSource = filterSource === "all" || lead.source === filterSource;

      const hasFollowUps = Boolean(lead.lastFollowUpAt);
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "followed_up" && hasFollowUps) ||
        (filterStatus === "pending" && !hasFollowUps);

      return matchesSearch && matchesSource && matchesStatus;
    });
  }, [leads, searchQuery, filterSource, filterStatus]);

  return (
    <main className="page-shell py-8 relative min-h-[85vh]">
      {/* Decorative Blur Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 h-72 w-72 rounded-full bg-amber-200/15 blur-3xl" />
        <div className="absolute bottom-10 left-1/4 h-96 w-96 rounded-full bg-rose-200/10 blur-3xl" />
      </div>

      <div className="relative z-10 space-y-6">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-amber-100/50 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-600 animate-pulse" />
              <h1 className="text-3xl font-extrabold text-amber-900 font-serif tracking-wide">
                Patient Follow-ups
              </h1>
            </div>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Logged in as <span className="text-amber-800">{sessionEmail}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 hover:text-rose-700 text-slate-700 px-4 py-2.5 text-sm font-semibold transition-smooth shadow-sm cursor-pointer self-start md:self-center"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-white p-5 rounded-2xl border border-amber-100/30 shadow-md">
          {/* Search box */}
          <div className="relative md:col-span-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search leads by name, phone, email, or concern..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600 transition-smooth"
            />
          </div>

          {/* Source Filter */}
          <div className="relative md:col-span-3">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-slate-400" />
            </div>
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600 transition-smooth appearance-none cursor-pointer"
            >
              <option value="all">All Sources</option>
              {uniqueSources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative md:col-span-3">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
              <Clock className="h-4 w-4 text-slate-400" />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600 transition-smooth appearance-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending Follow-up</option>
              <option value="followed_up">Followed Up</option>
            </select>
          </div>
        </div>

        {/* Lead Listing */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-amber-100 shadow-md">
            <Loader2 className="h-10 w-10 text-amber-600 animate-spin" />
            <p className="mt-4 text-sm text-slate-500 font-semibold">Loading contact leads...</p>
          </div>
        ) : error ? (
          <div className="p-6 bg-rose-50 text-center rounded-2xl border border-rose-100">
            <p className="text-sm font-semibold text-rose-700">{error}</p>
            <button
              onClick={fetchLeads}
              className="mt-3 px-4 py-2 text-xs font-bold text-white bg-rose-600 rounded-lg hover:bg-rose-700"
            >
              Retry
            </button>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-2xl border border-amber-100 shadow-md text-center">
            <Inbox className="h-12 w-12 text-amber-900/30" />
            <h3 className="mt-4 text-lg font-bold text-slate-800">No leads found</h3>
            <p className="mt-1 text-sm text-slate-500 max-w-sm">
              We couldn't find any leads matching your current search queries or status filters.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-amber-100 shadow-xl bg-white">
            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-amber-50/50 border-b border-amber-100 text-xs font-bold uppercase tracking-wider text-amber-900/80">
              <div className="col-span-2 flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Date Elapsed</div>
              <div className="col-span-2 flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Name</div>
              <div className="col-span-2 flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> Contact Number</div>
              <div className="col-span-2 flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> Email</div>
              <div className="col-span-2">Concern</div>
              <div className="col-span-2 text-right">Status</div>
            </div>

            {/* List Rows */}
            <div className="divide-y divide-slate-100">
              {filteredLeads.map((lead) => {
                const isExpanded = expandedLeadId === lead.id;
                const leadHistory = histories[lead.id] || [];
                const historyLoading = loadingHistories[lead.id];
                const emailSending = sendingEmail[lead.id];
                const waLogging = loggingFollowup[lead.id];

                return (
                  <div
                    key={lead.id}
                    className={`transition-all duration-200 ${
                      isExpanded ? "bg-amber-50/20" : "hover:bg-slate-50/50"
                    }`}
                  >
                    {/* Basic Info Row */}
                    <div
                      onClick={() => toggleExpand(lead)}
                      className="grid grid-cols-1 md:grid-cols-12 gap-3 px-6 py-4 items-center cursor-pointer text-sm"
                    >
                      {/* Mobile Label / Date */}
                      <div className="col-span-2 text-slate-600 font-medium flex items-center justify-between md:block">
                        <span className="md:hidden text-xs font-bold uppercase text-slate-400">Date</span>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-800">{relativeTime(lead.createdAt)}</span>
                          <span className="text-xs text-slate-400">
                            {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : ""}
                          </span>
                        </div>
                      </div>

                      {/* Mobile Label / Name */}
                      <div className="col-span-2 font-bold text-amber-950 flex items-center justify-between md:block">
                        <span className="md:hidden text-xs font-bold uppercase text-slate-400">Name</span>
                        <span>{lead.name}</span>
                      </div>

                      {/* Mobile Label / Phone */}
                      <div className="col-span-2 text-slate-700 flex items-center justify-between md:block">
                        <span className="md:hidden text-xs font-bold uppercase text-slate-400">Phone</span>
                        <span>{lead.phone}</span>
                      </div>

                      {/* Mobile Label / Email */}
                      <div className="col-span-2 text-slate-700 flex items-center justify-between md:block break-all">
                        <span className="md:hidden text-xs font-bold uppercase text-slate-400">Email</span>
                        <span>{lead.email || <span className="text-slate-400 italic">Not set</span>}</span>
                      </div>

                      {/* Mobile Label / Concern */}
                      <div className="col-span-2 text-slate-700 flex items-center justify-between md:block">
                        <span className="md:hidden text-xs font-bold uppercase text-slate-400">Concern</span>
                        <span className="rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800 border border-amber-100">
                          {lead.concern || "General inquiry"}
                        </span>
                      </div>

                      {/* Mobile Label / Status */}
                      <div className="col-span-2 flex items-center justify-between md:justify-end gap-2 md:text-right">
                        <span className="md:hidden text-xs font-bold uppercase text-slate-400">Status</span>
                        <div className="flex items-center gap-2">
                          {lead.lastFollowUpAt ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                              <CheckCircle className="h-3 w-3" />
                              Followed up
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-xs font-bold text-rose-800">
                              <Clock className="h-3 w-3" />
                              Pending
                            </span>
                          )}
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-slate-400" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Detailed Row (Expanded Panel) */}
                    {isExpanded && (
                      <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-white grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in-scale">
                        {/* Left Column: Full Details */}
                        <div className="lg:col-span-4 space-y-4 border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-6">
                          <h4 className="text-sm font-bold uppercase tracking-wider text-amber-900 border-b border-amber-100 pb-2">
                            Lead Inquiry Data
                          </h4>

                          <div className="space-y-3 text-xs leading-relaxed text-slate-700">
                            <div>
                              <span className="font-bold text-slate-500 block mb-1">Source:</span>
                              <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-800 rounded-md font-semibold font-mono">
                                {lead.source}
                              </span>
                            </div>

                            <div>
                              <span className="font-bold text-slate-500 block mb-1">Submitted Message:</span>
                              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 text-sm italic font-medium whitespace-pre-wrap leading-relaxed">
                                "{lead.message}"
                              </div>
                            </div>

                            {lead.lastFollowUpAt && (
                              <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-100/60">
                                <span className="font-bold text-amber-900 block mb-1">Last Contact Details:</span>
                                <p className="text-slate-800 font-semibold">
                                  Channel: <span className="uppercase font-mono text-amber-800">{lead.lastFollowUpType}</span>
                                </p>
                                <p className="text-slate-500 text-[11px] mt-0.5">
                                  {new Date(lead.lastFollowUpAt).toLocaleString()}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Middle/Right Column: Composer and Action Blocks */}
                        <div className="lg:col-span-5 space-y-4">
                          <h4 className="text-sm font-bold uppercase tracking-wider text-amber-900 border-b border-amber-100 pb-2">
                            Send Follow-Up
                          </h4>

                          {/* Follow up Forms */}
                          <div className="space-y-4">
                            {/* WhatsApp section */}
                            <div className="space-y-1.5 p-4 rounded-xl border border-emerald-100 bg-emerald-50/10">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                                  <MessageCircle className="h-4 w-4 text-emerald-600" /> WhatsApp Message
                                </span>
                                <span className="text-[11px] text-slate-400">Sent to: {lead.phone}</span>
                              </div>
                              <textarea
                                rows={2}
                                value={whatsappDrafts[lead.id] || ""}
                                onChange={(e) =>
                                  setWhatsappDrafts((prev) => ({ ...prev, [lead.id]: e.target.value }))
                                }
                                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-emerald-600 text-slate-800 leading-normal"
                              />
                            </div>

                            {/* Email section */}
                            {lead.email ? (
                              <div className="space-y-2.5 p-4 rounded-xl border border-amber-100 bg-amber-50/10">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                                    <Mail className="h-4 w-4 text-amber-600" /> Email follow-up (Styled template)
                                  </span>
                                  <span className="text-[11px] text-slate-400">Sent to: {lead.email}</span>
                                </div>
                                <div className="space-y-1.5">
                                  <input
                                    type="text"
                                    placeholder="Email Subject"
                                    value={emailSubjects[lead.id] || ""}
                                    onChange={(e) =>
                                      setEmailSubjects((prev) => ({ ...prev, [lead.id]: e.target.value }))
                                    }
                                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-amber-600 font-semibold text-slate-800"
                                  />
                                  <textarea
                                    rows={4}
                                    placeholder="Write your email body message here..."
                                    value={emailDrafts[lead.id] || ""}
                                    onChange={(e) =>
                                      setEmailDrafts((prev) => ({ ...prev, [lead.id]: e.target.value }))
                                    }
                                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-amber-600 text-slate-800 leading-normal"
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 text-xs italic">
                                Email follow-up unavailable: No email provided.
                              </div>
                            )}

                            {/* Buttons bar */}
                            <div className="grid grid-cols-3 gap-2">
                              <button
                                type="button"
                                disabled={waLogging}
                                onClick={() => handleSendWhatsApp(lead)}
                                className="flex items-center justify-center gap-1 px-3 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 disabled:opacity-60 transition-smooth shadow-sm cursor-pointer"
                              >
                                {waLogging ? "Logging..." : (
                                  <>
                                    <MessageCircle className="h-3.5 w-3.5" /> WA
                                  </>
                                )}
                              </button>

                              <button
                                type="button"
                                disabled={emailSending || !lead.email}
                                onClick={() => handleSendEmail(lead)}
                                className="flex items-center justify-center gap-1 px-3 py-2.5 bg-amber-600 text-white font-bold text-xs rounded-xl hover:bg-amber-700 disabled:opacity-60 transition-smooth shadow-sm cursor-pointer"
                              >
                                {emailSending ? "Sending..." : (
                                  <>
                                    <Mail className="h-3.5 w-3.5" /> Email
                                  </>
                                )}
                              </button>

                              <button
                                type="button"
                                disabled={emailSending || waLogging || !lead.email}
                                onClick={() => handleSendBoth(lead)}
                                className="flex items-center justify-center gap-1 px-3 py-2.5 bg-slate-800 text-white font-bold text-xs rounded-xl hover:bg-slate-900 disabled:opacity-60 transition-smooth shadow-sm cursor-pointer"
                              >
                                {emailSending || waLogging ? "Processing..." : (
                                  <>
                                    <Send className="h-3.5 w-3.5" /> Send Both
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Follow-up Log History */}
                        <div className="lg:col-span-3 space-y-4">
                          <h4 className="text-sm font-bold uppercase tracking-wider text-amber-900 border-b border-amber-100 pb-2">
                            Contact Logs History
                          </h4>

                          {historyLoading ? (
                            <div className="flex justify-center py-8">
                              <Loader2 className="h-6 w-6 text-amber-600 animate-spin" />
                            </div>
                          ) : leadHistory.length === 0 ? (
                            <p className="text-xs text-slate-500 italic text-center py-6">
                              No follow-up logs written yet.
                            </p>
                          ) : (
                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                              {leadHistory.map((item) => (
                                <div
                                  key={item.id}
                                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5"
                                >
                                  <div className="flex items-center justify-between text-[10px] font-bold">
                                    <span
                                      className={`inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-white ${
                                        item.type === "whatsapp" ? "bg-emerald-600" : "bg-amber-600"
                                      }`}
                                    >
                                      {item.type === "whatsapp" ? "WhatsApp" : "Email"}
                                    </span>
                                    <span className="text-slate-400">
                                      {item.sentAt ? relativeTime(item.sentAt) : "just now"}
                                    </span>
                                  </div>

                                  <div className="text-[11px] text-slate-700 leading-normal line-clamp-3 hover:line-clamp-none transition-all cursor-pointer whitespace-pre-wrap">
                                    {item.subject && (
                                      <p className="font-bold text-slate-800 mb-0.5">Subject: {item.subject}</p>
                                    )}
                                    "{item.content}"
                                  </div>

                                  <div className="text-[9px] text-slate-400 font-semibold flex items-center justify-between">
                                    <span>Sent by: {item.sentBy.split("@")[0]}</span>
                                    {item.sentAt && (
                                      <span>{new Date(item.sentAt).toLocaleDateString()}</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
