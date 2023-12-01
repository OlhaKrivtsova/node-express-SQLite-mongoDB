const bcrypt = require('bcrypt');
const User = require('../models/userModel');

module.exports = async (req, res, next) => {
  try {
    const authority = await req.headers.authorization;
    if (!authority && authority.indexOf('Basic') < 0)
      return res.status(401).json({message: 'Invalid authorization header'});
    const cryptCredentials = authority.split(' ')[1];
    const credentials = Buffer.from(cryptCredentials, 'base64').toString(
      'ascii'
    );
    const [email, password] = credentials.split(':');
    const user = await User.findOne({email});
    const isPasswordValid =
      (await user) && (await bcrypt.compare(password, user.password));
    if (!isPasswordValid)
      return res.status(400).json({message: 'Invalid login or password'});
    req.user = user._doc;
    next();
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
};
