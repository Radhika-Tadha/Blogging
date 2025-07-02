// utils.js
export const getTokenFromCookie = () => {
  const match = document.cookie.match(new RegExp('(^| )Token=([^;]+)'));
  return match ? match[2] : null;
};
