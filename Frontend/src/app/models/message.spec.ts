import { Message } from './message';

describe('Message', () => {
  it('should create an instance', () => {
    expect(new Message("test","sender","709843587432","message",null)).toBeTruthy();
  });
});
