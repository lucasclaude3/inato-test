import { DrugFactory, Pharmacy } from './pharmacy';

// Doliprane represents a 'standard' drug behavior according to the model
describe('Doliprane', () => {
  it('should decrease the benefit and expiresIn', () => {
    const doliprane = DrugFactory.createDrug('Doliprane', 2, 3);
    doliprane.updateBenefitValue();
    expect(doliprane).toEqual(DrugFactory.createDrug('Doliprane', 1, 2));
  });

  it('should decrease the benefit twice as fast when expired', () => {
    const doliprane = DrugFactory.createDrug('Doliprane', 0, 3);
    doliprane.updateBenefitValue();
    expect(doliprane).toEqual(DrugFactory.createDrug('Doliprane', -1, 1));
  });
});

describe('Herbal Tea', () => {
  it('should increase the benefit and decrease expiresIn', () => {
    const herbalTea = DrugFactory.createDrug('Herbal Tea', 2, 3);
    herbalTea.updateBenefitValue();
    expect(herbalTea).toEqual(DrugFactory.createDrug('Herbal Tea', 1, 4));
  });

  it('should increase the benefit twice as fast when expired', () => {
    const herbalTea = DrugFactory.createDrug('Herbal Tea', 0, 3);
    herbalTea.updateBenefitValue();
    expect(herbalTea).toEqual(DrugFactory.createDrug('Herbal Tea', -1, 5));
  });
});

describe('Fervex', () => {
  it('should increase the benefit and decrease expiresIn', () => {
    const fervex = DrugFactory.createDrug('Fervex', 11, 3);
    fervex.updateBenefitValue();
    expect(fervex).toEqual(DrugFactory.createDrug('Fervex', 10, 4));
  });

  it('should increase the benefit twice as fast when it expires in 10 days or less', () => {
    const fervex = DrugFactory.createDrug('Fervex', 10, 3);
    fervex.updateBenefitValue();
    expect(fervex).toEqual(DrugFactory.createDrug('Fervex', 9, 5));
  });

  it('should increase the benefit twice as fast when it expires in 6 days or less', () => {
    const fervex = DrugFactory.createDrug('Fervex', 5, 3);
    fervex.updateBenefitValue();
    expect(fervex).toEqual(DrugFactory.createDrug('Fervex', 4, 6));
  });

  it('should have zero benefit when expired', () => {
    const fervex = DrugFactory.createDrug('Fervex', 0, 3);
    fervex.updateBenefitValue();
    expect(fervex).toEqual(DrugFactory.createDrug('Fervex', -1, 0));
  });
});

describe('Magic Pill', () => {
  it('should keep its benefit and expire date', () => {
    const magicPill = DrugFactory.createDrug('Magic Pill', 11, 3);
    magicPill.updateBenefitValue();
    expect(magicPill).toEqual(DrugFactory.createDrug('Magic Pill', 11, 3));
  });
});

describe('Pharmacy', () => {
  it('should handle multiple drugs data update', () => {
    expect(new Pharmacy([DrugFactory.createDrug('Herbal Tea', 2, 3), DrugFactory.createDrug('Fervex', 2, 3)]).updateBenefitValue()).toEqual(
      [DrugFactory.createDrug('Herbal Tea', 1, 4), DrugFactory.createDrug('Fervex', 1, 6)],
    );
  });
});
