const { joinWaitlist } = require('../js/waitlist');

test('adds a normalized email', function () { assertEq(JSON.stringify(joinWaitlist([], '  Dana@Mail.COM ')), '["dana@mail.com"]'); });
test('does not mutate the input list', function () { var l = ['a@b.co']; joinWaitlist(l, 'c@d.co'); assertEq(l.length, 1); });
test('returns a new array', function () { var l = []; assertEq(joinWaitlist(l, 'c@d.co') !== l, true); });
test('ignores an email without @', function () { assertEq(joinWaitlist(['a@b.co'], 'nope.com').length, 1); });
test('ignores an email without a dot after @', function () { assertEq(joinWaitlist([], 'a.b@com').length, 0); });
test('does not add a duplicate', function () { assertEq(joinWaitlist(['a@b.co'], ' A@B.co').length, 1); });
