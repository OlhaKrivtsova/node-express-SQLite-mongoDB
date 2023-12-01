module.exports = async (req, res, next) => {
  try {
    if (!req.user.role === 'admin)')
      return res.status(400).json({message: `You don't have permission`});
    next();
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
};
