const {format_date} = require('../utils/helpers');
test('format_date() returns a date string', () => {
    const date = new Date('2021-07-10 17:01:02');

    expect(format_date(date)).toBe('7/10/2021');
});