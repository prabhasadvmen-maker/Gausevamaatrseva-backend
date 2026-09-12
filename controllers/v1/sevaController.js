const { sevasCatalog } = require('../../data/store');

/**
 * API-06: Get Seva Details & Preset Amounts
 * GET /api/v1/sevas/:seva_id
 * Auth: Public
 */
const getSevaById = (req, res) => {
  try {
    const { seva_id } = req.params;

    if (!seva_id) {
      return res.status(400).json({
        success: false,
        message: 'seva_id path parameter is required.',
        error_code: 'BAD_REQUEST'
      });
    }

    const seva = sevasCatalog.find(
      s => s.id.toLowerCase() === seva_id.toLowerCase() || s.slug.toLowerCase() === seva_id.toLowerCase()
    );

    if (!seva) {
      return res.status(404).json({
        success: false,
        message: `Seva with ID '${seva_id}' was not found.`,
        error_code: 'NOT_FOUND'
      });
    }

    return res.status(200).json({
      success: true,
      data: seva
    });
  } catch (error) {
    console.error('Error in getSevaById:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while fetching Seva details',
      error_code: 'INTERNAL_SERVER_ERROR'
    });
  }
};

/**
 * GET /api/v1/sevas
 * List all available Seva options
 */
const getAllSevas = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: sevasCatalog
    });
  } catch (error) {
    console.error('Error in getAllSevas:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while listing Sevas',
      error_code: 'INTERNAL_SERVER_ERROR'
    });
  }
};

module.exports = {
  getSevaById,
  getAllSevas
};
