const axios = require('axios');
const { setToken, findUserIdByToken } = require('../services/AuthenticatedUsers');

const requireAuthProvider = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Authorization token required' });

  const firebaseToken = authorization.split(' ')[1];
  const userIdFromToken = findUserIdByToken(firebaseToken);

  if (!userIdFromToken) {
    try {
      const apiKey = process.env.FIREBASE_API_KEY;
      const firebaseUrl = process.env.FIREBASE_URL;
      const url = `${firebaseUrl}/v1/accounts:lookup?key=${apiKey}`;
      const data = { idToken: firebaseToken };
      const response = await axios.post(url, data);

      if (response.status === 200) {
        const userData = response.data.users[0];
        const names = userData.displayName.split(' ');
        const firstName = names[0];
        const lastName = names[names.length-1];
        req.userData = {
          id: userData.localId,
          email: userData.email,
          first_name: firstName,
          last_name: lastName,
          user_name: userData.displayName
        };      
        console.log(req.userData);
        setToken(userData.localId, firebaseToken);
      } else {
        return res.status(401).json({ message: 'Token is invalid or expired' });
      }
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Failure querying Firebase' });
    }
  } else {
    req.user_id = userIdFromToken;
  }

  next();
};

module.exports = requireAuthProvider;
