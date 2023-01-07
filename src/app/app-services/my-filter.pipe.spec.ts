import { MyFilterPipe } from './my-filter.pipe';

describe('MyFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new MyFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
