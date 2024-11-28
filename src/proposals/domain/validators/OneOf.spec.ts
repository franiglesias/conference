import { OneOf } from './OneOf';
import { NotEmptyString } from './NotEmptyString';

describe('OneOf', () => {
  it('should accept valid values', () => {
    const validValues = [1, 2, 3];
    expect(OneOf(1, validValues, 'Invalid value here.')).toBe(1);
    expect(OneOf(2, validValues, 'Invalid value here.')).toBe(2);
    expect(OneOf(3, validValues, 'Invalid value here.')).toBe(3);
  });

  it('should fail if value is not in valid ones', () => {
    expect(() => OneOf(4, [1, 2, 3], 'Invalid value here.')).toThrow(
      'Invalid value here.',
    );
  });

  it('should fail if value is in different case', () => {
    expect(() => OneOf('A', ['a', 'b', 'c'], 'Invalid value here.')).toThrow(
      'Invalid value here.',
    );
  });

  it('should not mix value types', () => {
    expect(() => OneOf('a', ['a', 23, 'c'], 'Invalid value here.')).toThrow(
      'not the same type',
    );
  });

  it('should compose with others', () => {
    expect(
      OneOf(
        NotEmptyString('active', 'Empty string'),
        ['active', 'inactive'],
        'Invalid value here.',
      ),
    ).toBe('active');
  });

  it('should fail inside validator first', () => {
    expect(() => {
      OneOf(
        NotEmptyString('', 'Empty string'),
        ['active', 'inactive'],
        'Invalid value here.',
      );
    }).toThrow('Empty string');
  });

  it('should fail outside validator last', () => {
    expect(() => {
      OneOf(
        NotEmptyString('no valid status', 'Empty string'),
        ['active', 'inactive'],
        'Invalid status',
      );
    }).toThrow('Invalid status');
  });
});
