const { users, donations } = require('../../data/store');

/**
 * API-11: Get User Profile
 * GET /api/v1/user/profile
 * Auth: Private (Bearer Token)
 */
const getUserProfile = (req, res) => {
  try {
    const userPhone = req.user.phone;
    let user = users.get(userPhone);

    if (!user) {
      user = req.user;
    }

    // Calculate User's donation stats
    const userDonations = donations.filter(
      d => d.user_id === user.id || (userPhone && d.donor_phone.includes(userPhone))
    );
    const completedDonations = userDonations.filter(d => d.status === 'COMPLETED');
    const totalDonationsCount = completedDonations.length;
    const totalDonationsAmount = completedDonations.reduce((sum, d) => sum + d.amount, 0);

    // Calculate most responsive / frequent seva title
    const sevaCounts = {};
    completedDonations.forEach(d => {
      sevaCounts[d.seva_title] = (sevaCounts[d.seva_title] || 0) + 1;
    });

    let mostResponsive = completedDonations.length > 0 ? '' : 'General Sanctuary Support';
    let maxCount = 0;
    for (const [title, count] of Object.entries(sevaCounts)) {
      if (count > maxCount) {
        maxCount = count;
        mostResponsive = title;
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        id: user.id,
        name: user.name || 'Gousevak',
        phone: user.phone,
        email: user.email || '',
        pan: user.pan || '',
        address: user.address || { line1: '', city: '', state: '', pincode: '' },
        total_donations_count: totalDonationsCount,
        total_donations_amount: totalDonationsAmount,
        most_responsive: mostResponsive
      }
    });
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while fetching profile',
      error_code: 'INTERNAL_SERVER_ERROR'
    });
  }
};

/**
 * API-12: Update User Profile Details
 * PUT /api/v1/user/profile
 * Auth: Private (Bearer Token)
 */
const updateUserProfile = (req, res) => {
  try {
    const userPhone = req.user.phone;
    let user = users.get(userPhone);

    if (!user) {
      user = { ...req.user };
    }

    const { name, email, pan, address } = req.body;

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (pan !== undefined) user.pan = pan;
    if (address !== undefined) {
      user.address = {
        ...user.address,
        ...address
      };
    }

    users.set(userPhone, user);

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        pan: user.pan,
        address: user.address
      }
    });
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while updating profile',
      error_code: 'INTERNAL_SERVER_ERROR'
    });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile
};
