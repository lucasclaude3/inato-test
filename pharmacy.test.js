import { DrugFactory, Pharmacy } from './pharmacy';

describe('Pharmacy', () => {
  it('should decrease the benefit and expiresIn', () => {
    expect(new Pharmacy([DrugFactory.createDrug('test', 2, 3)]).updateBenefitValue()).toEqual(
      [DrugFactory.createDrug('test', 1, 2)],
    );
  });
});
