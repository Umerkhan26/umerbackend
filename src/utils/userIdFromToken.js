// utils.js
function extractUserIdFromToken(token) {
    if (typeof token === 'object' && token !== null && 'userId' in token) {
      return token.userId;
    }
    throw new Error('Invalid token structure: userId not found');
  }
  
  module.exports = { extractUserIdFromToken };
  