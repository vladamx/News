import { ellipsis } from './ellipsis';

describe('ellipsis', () => {
  test('it should put ellipsis at the end of string, if string length is greater than bound', () => {
    const input = '12345678910111213';
    const output = '123456789101112...';

    expect(ellipsis(input, 15)).toEqual(output);
  });
  test('it should not put ellipsis at the end of string, if string length is equal to bound', () => {
    const input = '123456789101112';
    const output = '123456789101112';

    expect(ellipsis(input, 15)).toEqual(output);
  });
  test('it should not put ellipsis at the end of string, if string length is lower than bound', () => {
    const input = '123456789101112';
    const output = '123456789101112';

    expect(ellipsis(input, 15)).toEqual(output);
  });
});
