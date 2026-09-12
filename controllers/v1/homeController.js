const { dashboardData, sevasCatalog, donations } = require('../../data/store');

/**
 * API-04: Get Home Dashboard & Hero Banner
 * GET /api/v1/home/dashboard
 * Auth: Optional Auth
 */
const getHomeDashboard = (req, res) => {
  try {
    let userMonthlySummary = {
      donations_this_month: 0,
      amount_donated_this_month: 0
    };

    if (req.user && req.user.id) {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const userDonations = donations.filter(d => d.user_id === req.user.id && d.status === 'COMPLETED');
      const monthlyUserDonations = userDonations.filter(d => {
        const date = new Date(d.created_at);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      });

      userMonthlySummary = {
        donations_this_month: monthlyUserDonations.length,
        amount_donated_this_month: monthlyUserDonations.reduce((sum, d) => sum + d.amount, 0)
      };
    }

    const completedAll = donations.filter(d => d.status === 'COMPLETED');
    const totalDonationsAmount = completedAll.reduce((sum, d) => sum + d.amount, 0);
    const activeDonorsCount = new Set(completedAll.map(d => d.user_id)).size;

    const dynamicImpact = {
      cows_fed: Math.round(totalDonationsAmount / 100),
      medical_treatments: Math.round(totalDonationsAmount / 500),
      shelters_built: Math.floor(totalDonationsAmount / 10000),
      total_donations_amount: totalDonationsAmount,
      active_donors_count: activeDonorsCount
    };

    return res.status(200).json({
      success: true,
      data: {
        hero_banner: dashboardData.hero_banner,
        banners: dashboardData.banners,
        all_time_community_impact: dynamicImpact,
        monthly_impact: {
          month: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
          cows_fed_this_month: dynamicImpact.cows_fed,
          fodder_distributed_kg: dynamicImpact.cows_fed * 5,
          medical_cases_treated: dynamicImpact.medical_treatments,
          donations_this_month: totalDonationsAmount
        },
        featured_sevas: sevasCatalog,
        user_monthly_summary: userMonthlySummary
      }
    });
  } catch (error) {
    console.error('Error in getHomeDashboard:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error fetching home dashboard',
      error_code: 'INTERNAL_SERVER_ERROR'
    });
  }
};

module.exports = {
  getHomeDashboard
};
