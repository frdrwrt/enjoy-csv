import demo from './demo';

describe('demo mode', () => {
  test('should trim and rename description', () => {
    expect(demo({ id: 1, description: ' product  ', price: 1.99 })).toEqual({
      id: 1,
      name: 'product',
      price: '2.09',
    });
  });

  test('should add 10cent to price', () => {
    expect(demo({ id: 1, description: 'product', price: 1.99 })).toEqual({
      id: 1,
      name: 'product',
      price: '2.09',
    });
  });
});
