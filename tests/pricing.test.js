const { calcTotal, maxTickets } = require('../js/pricing');

test('two tickets cost 724', function () { assertEq(calcTotal(2), 724); });
test('one ticket costs 362', function () { assertEq(calcTotal(1), 362); });
test('regular customers may buy up to 8', function () { assertEq(maxTickets(), 8); });

test('member pays 584 for two tickets (fee not discounted)', function () { assertEq(calcTotal(2, true), 584); });
test('regular customer pays 724 for two tickets', function () { assertEq(calcTotal(2, false), 724); });
test('members may buy up to 6', function () { assertEq(maxTickets(true), 6); });
test('regular customers limit stays 8', function () { assertEq(maxTickets(false), 8); });
test('member over the limit returns null', function () { assertEq(calcTotal(7, true), null); });
test('member may order 6 tickets', function () { assertEq(calcTotal(6, true), 1752); });
test('zero tickets returns null', function () { assertEq(calcTotal(0, false), null); });
test('nine tickets for a regular customer returns null', function () { assertEq(calcTotal(9, false), null); });
