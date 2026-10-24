/**
 * Real Data Store for Mobile App & Admin Portal APIs
 * Clean in-memory repository for OTP sessions, Users, Seva Catalog, Donations, and Dashboard Metrics.
 */

// OTP Sessions Map (session_id -> session object)
const otpSessions = new Map();

// Users Map (phone -> user object) - Starts with test users
const users = new Map([
  [
    '5555555555',
    {
      id: 'usr_5555555555',
      phone: '5555555555',
      country_code: '+91',
      name: 'Test Donor 1',
      email: 'donor1@gousevamaatraseva.com',
      pan: '',
      address: {
        line1: 'Test Address',
        city: 'Gurugram',
        state: 'Haryana',
        pincode: '122001'
      },
      createdAt: new Date().toISOString()
    }
  ],
  [
    '9876543210',
    {
      id: 'usr_9876543210',
      phone: '9876543210',
      country_code: '+91',
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      pan: '',
      address: {
        line1: 'Sector 53',
        city: 'Gurugram',
        state: 'Haryana',
        pincode: '122003'
      },
      createdAt: new Date().toISOString()
    }
  ],
  [
    '8765432109',
    {
      id: 'usr_8765432109',
      phone: '8765432109',
      country_code: '+91',
      name: 'Priya Singh',
      email: 'priya@example.com',
      pan: '',
      address: {
        line1: 'Sector 45',
        city: 'Noida',
        state: 'Uttar Pradesh',
        pincode: '201301'
      },
      createdAt: new Date().toISOString()
    }
  ]
]);

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

// Live Donations Array - Starts with test donations
const donations = [
  {
    donation_id: 'TXN-TEST-001',
    razorpay_order_id: 'order_test_001',
    razorpay_payment_id: 'pay_test_001',
    user_id: 'usr_5555555555',
    donor_name: 'Test Donor 1',
    donor_phone: '5555555555',
    donor_email: 'donor1@gousevamaatraseva.com',
    pan_number: '',
    is_anonymous: false,
    seva_id: 'seva_gaush_bhojan',
    seva_title: 'Daily Green Fodder & Feed Seva',
    amount: 1100,
    currency: 'INR',
    status: 'COMPLETED',
    receipt_number: 'GMS-2026-001',
    receipt_url: null,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    donation_id: 'TXN-TEST-002',
    razorpay_order_id: 'order_test_002',
    razorpay_payment_id: 'pay_test_002',
    user_id: 'usr_9876543210',
    donor_name: 'Rajesh Kumar',
    donor_phone: '9876543210',
    donor_email: 'rajesh@example.com',
    pan_number: '',
    is_anonymous: false,
    seva_id: 'seva_medical',
    seva_title: 'Emergency Medical & Ambulance Seva',
    amount: 2100,
    currency: 'INR',
    status: 'COMPLETED',
    receipt_number: 'GMS-2026-002',
    receipt_url: null,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    donation_id: 'TXN-TEST-003',
    razorpay_order_id: 'order_test_003',
    razorpay_payment_id: 'pay_test_003',
    user_id: 'usr_8765432109',
    donor_name: 'Priya Singh',
    donor_phone: '8765432109',
    donor_email: 'priya@example.com',
    pan_number: '',
    is_anonymous: false,
    seva_id: 'seva_sanctuary',
    seva_title: 'Sanctuary Shed & Shelter Seva',
    amount: 5100,
    currency: 'INR',
    status: 'COMPLETED',
    receipt_number: 'GMS-2026-003',
    receipt_url: null,
    created_at: new Date().toISOString()
  },
  {
    donation_id: 'TXN-TEST-004',
    razorpay_order_id: 'order_test_004',
    razorpay_payment_id: 'pay_test_004',
    user_id: 'usr_5555555555',
    donor_name: 'Test Donor 1',
    donor_phone: '5555555555',
    donor_email: 'donor1@gousevamaatraseva.com',
    pan_number: '',
    is_anonymous: false,
    seva_id: 'seva_vriddh_gausammardhan',
    seva_title: 'Elderly & Disabled Cow Protection',
    amount: 2100,
    currency: 'INR',
    status: 'COMPLETED',
    receipt_number: 'GMS-2026-004',
    receipt_url: null,
    created_at: new Date().toISOString()
  }
];

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
