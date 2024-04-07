let authenticatedUsers = {};

const getToken = (userId) => authenticatedUsers[userId];

const setToken = (userId, token) => {
  authenticatedUsers[userId] = token;
};

const deleteToken = (userId) => {
  delete authenticatedUsers[userId];
};

const findUserIdByToken = (token) => Object.keys(authenticatedUsers).find(key => authenticatedUsers[key] === token);

module.exports = { getToken, setToken, deleteToken, findUserIdByToken, authenticatedUsers };
