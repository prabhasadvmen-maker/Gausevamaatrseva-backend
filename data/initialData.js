// Initial Data Repository for Gouseva Maatra Seva

let siteSettings = {
  trustName: "Gouseva Maatra Seva",
  domain: "GousevaMaatraSeva.com",
  subTitle: "Cow Welfare & Protection Trust",
  slogan: "Cow Protection • Compassion • Sanctuary",
  phone: "+91 98765 43210",
  whatsapp: "+919876543210",
  email: "info@gousevamaatraseva.com",
  address: "Orchid Center, 3rd Floor, Golf Course Road, SEC-53, Gurugram, HR - 122002, IND",
  upiId: "gousevamaatraseva@upi",
  bankName: "State Bank of India (SBI)",
  accountNumber: "38920100984712",
  ifsc: "SBIN0004521",
  dailyTargetFeedKg: 5000,
  emergencyAlertsEnabled: true,
  autoReceiptsEnabled: true
};

const recentDonations = [];

const overviewStats = {
  totalNgos: 1,
  totalUsers: 0,
  totalDonations: "₹0",
  activeVolunteers: 0,
  systemStatus: "System Live and Synchronized",
  dateFormatted: new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
};

const chartData = {
  userRegistrations: [
    { month: 'Apr', count: 0 },
    { month: 'May', count: 0 },
    { month: 'Jun', count: 0 },
    { month: 'Jul', count: 0 },
    { month: 'Aug', count: 0 },
    { month: 'Sep', count: 0 }
  ],
  financialTrends: [
    { month: 'Apr', donations: 0, expenses: 0 },
    { month: 'May', donations: 0, expenses: 0 },
    { month: 'Jun', donations: 0, expenses: 0 },
    { month: 'Jul', donations: 0, expenses: 0 },
    { month: 'Aug', donations: 0, expenses: 0 },
    { month: 'Sep', donations: 0, expenses: 0 }
  ]
};

const helpData = {
  contactSupport: {
    phone: "+91 98765 43210",
    email: "support@gousevamaatraseva.com",
    hours: "24/7 Technical Assistance"
  },
  faqs: [
    {
      question: "How do I update donation details or UPI ID?",
      answer: "Navigate to the Settings tab in this Admin Panel, edit the UPI ID or Bank details, and click 'Save Settings'."
    },
    {
      question: "How is the 'System Live and Synchronized' status updated?",
      answer: "The status is auto-monitored by our backend health check service every 30 seconds."
    },
    {
      question: "How do I add or manage volunteer access?",
      answer: "Volunteer roles can be configured under system management in the users section."
    }
  ]
};

const getSiteSettings = () => siteSettings;
const updateSiteSettings = (newSettings) => {
  siteSettings = { ...siteSettings, ...newSettings };
  return siteSettings;
};

module.exports = {
  getSiteSettings,
  updateSiteSettings,
  recentDonations,
  overviewStats,
  chartData,
  helpData
};
