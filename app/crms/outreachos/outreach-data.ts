export const stages = [
  {
    name: "Lead Queued", tone: "queued", trigger: "A contact enters the CRM",
    detail: "A CSV import or manual entry creates the lead with a role track and region. Touch 1 is due as soon as the address passes prechecks and the lead clears the selected mode, send window and daily cap.",
    example: "Maya at Juniper Studio enters on the AI Product Marketing track. Her address passes the domain checks.",
  },
  {
    name: "Outreach Active", tone: "info", trigger: "The first email goes out",
    detail: "After Touch 1 sends, Gmail holds the thread and OutreachOS schedules the next business-day touch. The CRM watches for a reply in that thread or as a new message, and looks for delivery notices.",
    example: "Maya gets a short introduction. The first follow-up is due in three business days by default.",
  },
  {
    name: "Warm Engaged", tone: "warning", trigger: "An engagement signal arrives",
    detail: "A counted link click, an attributed portfolio visit or two counted opens can move a lead to Warm Engaged. If Touch 2 is still next, it uses the warm walkthrough template. Opens can be noisy, so the dossier shows the events behind the stage.",
    example: "A portfolio click moves Maya to Warm. Her next email can offer a short walkthrough.",
  },
  {
    name: "Replied · Triage", tone: "violet", trigger: "A reply needs a human decision",
    detail: "When the CRM detects a human reply, it stops the sequence, saves the reply insight and can send a Telegram alert. The owner decides whether to book a call, park the contact or close the lead. A bounce follows its own route to the archive.",
    example: "Maya asks about a call. A suggested reply appears for review and the next touch is cleared.",
  },
  {
    name: "Interviewing", tone: "teal", trigger: "The owner books a call",
    detail: "The owner moves a lead into Interviewing and tracks HR Screen, Hiring Manager, Case Study and Final Round as sub-stages. The outreach sequence stays off while the conversation proceeds.",
    example: "The first call is booked. Maya’s dossier moves to HR Screen.",
  },
  {
    name: "Offer & Closing", tone: "success", trigger: "An offer is on the table",
    detail: "The owner moves the lead here and tracks compensation, notice period and next steps in the dossier notes. Automated outreach stays off.",
    example: "The earlier messages and interview notes stay available while the offer is discussed.",
  },
  {
    name: "Nurture / Future", tone: "pink", trigger: "There may be a fit later",
    detail: "The owner can park a contact and set a follow-up date. The default is 60 days. When that date arrives, the lead returns to Triage for a decision with the sequence still off.",
    example: "If Maya said the role was on hold, the lead could resurface when the team is ready to revisit it.",
  },
  {
    name: "Closed / Archive", tone: "danger", trigger: "The sequence or opportunity ends",
    detail: "The archive records Hired, Withdrawn, Rejected, Ghosted or Bounced. By default, silence for four business days after Touch 4 becomes Ghosted. Gmail still watches ghosted leads for late replies for 30 days. Hard bounces suppress the address going forward.",
    example: "If the full sequence went unanswered, the dossier would close and retain the thread history.",
  },
] as const;

export const tracks = [
  { name: "Hybrid", role: "Brand Marketing & AI Product roles", proof: "I lead brand work and build AI products. My portfolio has examples of both." },
  { name: "Brand", role: "Senior Brand Marketing Manager", proof: "I lead brand and growth work. My portfolio includes examples of campaigns and the systems behind them." },
  { name: "AI Product Marketing", role: "AI Product Marketing Manager", proof: "I work across positioning and product. My portfolio shows how I build with AI and explain what the tools do." },
  { name: "AI Product Management", role: "AI Product Manager", proof: "I build AI products from the first brief through release. My portfolio includes the trade-offs behind a few of those builds." },
] as const;

export const touches = [
  { id: "T1", name: "Introduction", wait: "First eligible window", tone: "info", detail: "Lead with the role, a piece of proof and one small ask." },
  { id: "T2A", name: "Warm walkthrough", wait: "+3 business days", tone: "warning", detail: "Offer a brief walkthrough after an engagement signal." },
  { id: "T2B", name: "Cold proof bump", wait: "+3 business days", tone: "violet", detail: "Make the purpose clear again and ask for a quick reply or referral." },
  { id: "T3", name: "Value note", wait: "+5 business days", tone: "teal", detail: "Share relevant write-ups the recipient can use or skim." },
  { id: "T4", name: "Polite close", wait: "+6 business days", tone: "pink", detail: "Close the loop and leave the portfolio available." },
] as const;

export const metrics = [
  { label: "Opens", count: "18 / 40", rate: 45, tone: "info" },
  { label: "Clicks", count: "8 / 40", rate: 20, tone: "warning" },
  { label: "Human replies", count: "6 / 32", rate: 19, tone: "violet" },
  { label: "Portfolio visits", count: "5 / 32", rate: 16, tone: "teal" },
  { label: "Positive replies", count: "3 / 32", rate: 9, tone: "success" },
  { label: "Bounces", count: "2 / 42", rate: 5, tone: "danger" },
] as const;
