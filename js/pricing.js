// מחירון TicketRush
const TICKET_PRICE = 350; // ₪ לכרטיס
const SERVICE_FEE = 12;   // ₪ עמלת שירות לכל כרטיס
const MAX_TICKETS = 8;    // מקסימום כרטיסים להזמנה
const MEMBER_DISCOUNT = 0.2;    // 20% הנחה לחברות מועדון (על מחיר הכרטיס בלבד)
const MEMBER_MAX_TICKETS = 6;   // מכסה לחברות מועדון
const STUDENT_DISCOUNT = 0.15;  // מבצע סטודנטיות: 15% על מחיר הכרטיס

function maxTickets(isMember) {
  return isMember ? MEMBER_MAX_TICKETS : MAX_TICKETS;
}

// ההנחות לא מצטברות: מקבלים רק את הגדולה מביניהן. עמלת השירות לעולם לא בהנחה.
function calcTotal(qty, isMember, isStudent) {
  isMember = !!isMember;
  if (!Number.isInteger(qty) || qty < 1 || qty > maxTickets(isMember)) return null;
  const discount = Math.max(isMember ? MEMBER_DISCOUNT : 0, isStudent ? STUDENT_DISCOUNT : 0);
  const ticket = TICKET_PRICE * (1 - discount);
  return qty * (ticket + SERVICE_FEE);
}

if (typeof module !== 'undefined') {
  module.exports = { TICKET_PRICE, SERVICE_FEE, MAX_TICKETS, MEMBER_DISCOUNT, MEMBER_MAX_TICKETS, STUDENT_DISCOUNT, maxTickets, calcTotal };
}
