import { Chat } from './chat';

describe('Chat', () => {
  it('should create an instance', () => {
    expect(new Chat("", "",new Date(),['test1','test2'], true, null,'noType')).toBeTruthy();
  });
});
