import { moneyPipe } from './money.pipe';

describe('MoneyPipe', () => {
  it('create an instance', () => {
    const pipe = new moneyPipe();
    expect(pipe).toBeTruthy();
  });
});
