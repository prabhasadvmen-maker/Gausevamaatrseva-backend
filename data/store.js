/**
 * Real Data Store for Mobile App & Admin Portal APIs
 * Clean in-memory repository for OTP sessions, Users, Seva Catalog, Donations, and Dashboard Metrics.
 */

// OTP Sessions Map (session_id -> session object)
const otpSessions = new Map();

// Users Map (phone -> user object) - Starts clean
const users = new Map();

// Official Seva Catalog
const sevasCatalog = [
  {
    id: "seva_gaush_bhojan",
    slug: "gausammardhan-bhojan",
    title: "Daily Green Fodder & Feed Seva",
    description: "Provide fresh green grass, fodder, and nutritious feed daily to rescued and elderly cows.",
    default_amount: 1100,
    preset_amounts: [100, 250, 500, 1100, 2100, 5100],
    duration_label: "Per Cow / Per Day",
    recommended: true,
    allow_custom_amount: true,
    image_url: "https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "seva_medical",
    slug: "medical-ambulance-care",
    title: "Emergency Medical & Ambulance Seva",
    description: "Sponsor life-saving medical care, surgeries, wound treatments, and emergency mobile ambulance for injured cows.",
    default_amount: 2100,
    preset_amounts: [500, 1100, 2100, 5100, 11000],
    duration_label: "Per Treatment Support",
    recommended: false,
    allow_custom_amount: true,
    image_url: "https://images.unsplash.com/photo-1570042707223-b67f1396b27e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "seva_sanctuary",
    slug: "sanctuary-shelter-maintenance",
    title: "Sanctuary Shed & Shelter Seva",
    description: "Construct clean, weather-protected sheds, solar ceiling fans, and comfortable bedding for cows during harsh weather.",
    default_amount: 5100,
    preset_amounts: [1100, 2100, 5100, 11000, 25000],
    duration_label: "Per Shelter Unit",
    recommended: false,
    allow_custom_amount: true,
    image_url: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "seva_vriddh_gausammardhan",
    slug: "vriddh-gau-seva",
    title: "Elderly & Disabled Cow Protection",
    description: "Specialized lifelong care, dietary supplements, and hospice support for non-lactating and physically challenged cows.",
    default_amount: 2100,
    preset_amounts: [500, 1100, 2100, 5100, 11000],
    duration_label: "Monthly Adoption",
    recommended: true,
    allow_custom_amount: true,
    image_url: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80"
  }
];

// Live Donations Array - Starts clean
const donations = [];

// Dashboard Banners & Impact Settings
const dashboardData = {
  hero_banner: {
    id: "banner_hero_01",
    title: "Protect & Feed Mother Cows Daily",
    subtitle: "Join thousands of daily Gousevaks providing nutritious fodder and medical care.",
    image_url: "https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=1200&q=80",
    action_url: "/sevas/seva_gaush_bhojan",
    button_text: "Donate Fodder Now"
  },
  banners: [
    {
      id: "banner_sub_01",
      title: "24/7 Cow Emergency Rescue Ambulance",
      subtitle: "Helpline: +91 98765 43210 for injured strays",
      image_url: "https://images.unsplash.com/photo-1570042707223-b67f1396b27e?auto=format&fit=crop&w=800&q=80",
      action_url: "/sevas/seva_medical"
    },
    {
      id: "banner_sub_02",
      title: "Monsoon Shelter Protection Drive",
      subtitle: "Help construct waterproof sheds for rescued cows",
      image_url: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80",
      action_url: "/sevas/seva_sanctuary"
    }
  ],
  all_time_community_impact: {
    cows_fed: 0,
    medical_treatments: 0,
    shelters_built: 0,
    total_donations_amount: 0,
    active_donors_count: 0
  },
  monthly_impact: {
    month: "September 2026",
    cows_fed_this_month: 0,
    fodder_distributed_kg: 0,
    medical_cases_treated: 0,
    donations_this_month: 0
  }
};

module.exports = {
  otpSessions,
  users,
  sevasCatalog,
  donations,
  dashboardData
};
