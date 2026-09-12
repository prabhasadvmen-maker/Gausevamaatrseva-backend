const {
  getSiteSettings,
  updateSiteSettings,
  recentDonations,
  chartData,
  helpData
} = require('../data/initialData');

const { users, donations, sevasCatalog } = require('../data/store');

// GET Overview Statistics (100% Real Live Calculated)
const getStats = (req, res) => {
  const completedDonations = donations.filter(d => d.status === 'COMPLETED');
  const liveDonationSum = completedDonations.reduce((sum, d) => sum + d.amount, 0);

  let formattedTotal = '₹0';
  if (liveDonationSum >= 100000) {
    formattedTotal = `₹${(liveDonationSum / 100000).toFixed(2)}L`;
  } else {
    formattedTotal = `₹${liveDonationSum.toLocaleString('en-IN')}`;
  }

  res.json({
    success: true,
    data: {
      totalNgos: 1,
      totalUsers: users.size,
      totalDonations: formattedTotal,
      totalDonationsRaw: liveDonationSum,
      activeVolunteers: 0,
      systemStatus: 'System Live and Synchronized',
      dateFormatted: new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      lastUpdated: new Date().toISOString()
    }
  });
};

// GET Financial & User Charts Data
const getCharts = (req, res) => {
  res.json({
    success: true,
    ...chartData
  });
};

// GET All Real Transactions/Donations
const getDonations = (req, res) => {
  const formattedLiveDonations = donations.map(d => ({
    id: d.donation_id,
    donor: d.donor_name || 'Anonymous Gousevak',
    amount: `₹${d.amount.toLocaleString('en-IN')}`,
    amountRaw: d.amount,
    seva: d.seva_title || 'Gouseva Donation',
    status: d.status === 'COMPLETED' ? 'Completed' : (d.status === 'PENDING' ? 'Pending' : 'Failed'),
    date: new Date(d.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    receipt: d.receipt_number || 'N/A'
  }));

  res.json({
    success: true,
    donations: formattedLiveDonations
  });
};

// POST Add Manual Offline Donation
const addManualDonation = (req, res) => {
  const { donor_name, amount, seva_title, payment_mode = 'Cash/Direct' } = req.body;
  
  if (!amount || amount <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid donation amount' });
  }

  const newDonation = {
    donation_id: `TXN-MANUAL-${Date.now()}`,
    razorpay_order_id: `manual_${payment_mode}`,
    razorpay_payment_id: `offline_${payment_mode}`,
    user_id: 'usr_manual',
    donor_name: donor_name || 'Anonymous Donor',
    donor_phone: '',
    donor_email: '',
    pan_number: '',
    is_anonymous: false,
    seva_id: 'seva_manual',
    seva_title: seva_title || 'General Sanctuary Support',
    amount: Number(amount),
    currency: 'INR',
    status: 'COMPLETED',
    receipt_number: `GMS-MANUAL-${Math.floor(1000 + Math.random() * 9000)}`,
    receipt_url: null,
    created_at: new Date().toISOString()
  };

  donations.unshift(newDonation);

  res.json({
    success: true,
    message: 'Manual donation added successfully',
    donation: newDonation
  });
};

// POST Add New Seva Package
const addSevaPackage = (req, res) => {
  const { title, description, default_amount, preset_amounts, duration_label, recommended } = req.body;

  if (!title || !default_amount) {
    return res.status(400).json({ success: false, message: 'Seva title and default amount are required' });
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const id = `seva_${slug.slice(0, 15)}_${Date.now().toString().slice(-4)}`;

  const newSeva = {
    id,
    slug,
    title,
    description: description || 'Support rescued cows with fodder and sanctuary care.',
    default_amount: Number(default_amount),
    preset_amounts: Array.isArray(preset_amounts) && preset_amounts.length > 0 
      ? preset_amounts.map(Number) 
      : [100, 250, 500, Number(default_amount), 2100, 5100],
    duration_label: duration_label || 'Per Cow / Per Day',
    recommended: Boolean(recommended),
    allow_custom_amount: true,
    image_url: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80'
  };

  sevasCatalog.push(newSeva);

  return res.json({
    success: true,
    message: 'Seva package added successfully',
    data: newSeva
  });
};

// GET All Registered App Users
const getUsers = (req, res) => {
  const userList = Array.from(users.values()).map(u => {
    const userDonations = donations.filter(d => d.user_id === u.id && d.status === 'COMPLETED');
    const totalDonated = userDonations.reduce((sum, d) => sum + d.amount, 0);
    return {
      ...u,
      total_donations_count: userDonations.length,
      total_donations_amount: totalDonated
    };
  });

  res.json({
    success: true,
    users: userList
  });
};

// GET Site Settings
const getSettings = (req, res) => {
  res.json({
    success: true,
    settings: getSiteSettings()
  });
};

// PUT Update Site Settings
const updateSettings = (req, res) => {
  const updated = updateSiteSettings(req.body);
  res.json({
    success: true,
    message: 'Settings updated successfully',
    settings: updated
  });
};

// GET Help & Documentation
const getHelp = (req, res) => {
  res.json({
    success: true,
    ...helpData
  });
};

module.exports = {
  getStats,
  getCharts,
  getDonations,
  addManualDonation,
  addSevaPackage,
  getUsers,
  getSettings,
  updateSettings,
  getHelp
};
