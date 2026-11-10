// רשימת המתנה לכרטיסים שאזלו

function normalizeEmail(email) {
  return String(email == null ? '' : email).trim().toLowerCase();
}

function isValidEmail(email) {
  const at = email.indexOf('@');
  return at > 0 && email.indexOf('.', at + 1) > at + 1;
}

// מחזירה מערך חדש; לא משנה את המערך שהתקבל
function joinWaitlist(list, email) {
  const current = Array.isArray(list) ? list.slice() : [];
  const clean = normalizeEmail(email);
  if (!isValidEmail(clean)) return current;
  if (current.indexOf(clean) !== -1) return current;
  current.push(clean);
  return current;
}

module.exports = { joinWaitlist };
