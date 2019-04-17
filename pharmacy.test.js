import { DrugFactory, Pharmacy } from './pharmacy';

// Doliprane represents a common drug behavior according to the model
describe('Doliprane (common drug)', () => {
  it('should throw an error if we call the Drug constructor with non integer values', () => {
    expect(() => {
      DrugFactory.createDrug('Doliprane', 'j\'expire quand je veux!', 3);
    }).toThrow();
  });

  it('should throw an error if we call the Drug constructor with a benefit outside the specified range', () => {
    expect(() => {
      DrugFactory.createDrug('Doliprane', 0, -1);
    }).toThrow();
  });

  it('should decrease the benefit and decrease expiresIn', () => {
    const doliprane = DrugFactory.createDrug('Doliprane', 2, 3);
    doliprane.updateBenefitValue();
    expect(doliprane).toEqual(DrugFactory.createDrug('Doliprane', 1, 2));
  });

  it('should decrease the benefit twice as fast when expired', () => {
    const doliprane = DrugFactory.createDrug('Doliprane', 0, 3);
    doliprane.updateBenefitValue();
    expect(doliprane).toEqual(DrugFactory.createDrug('Doliprane', -1, 1));
  });

  it('should not have a benefit below 0', () => {
    const doliprane = DrugFactory.createDrug('Doliprane', 0, 0);
    doliprane.updateBenefitValue();
    expect(doliprane).toEqual(DrugFactory.createDrug('Doliprane', -1, 0));
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

  it('should not have a benefit over 50', () => {
    const herbalTea = DrugFactory.createDrug('Herbal Tea', 0, 50);
    herbalTea.updateBenefitValue();
    expect(herbalTea).toEqual(DrugFactory.createDrug('Herbal Tea', -1, 50));
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

  it('should not have a benefit over 50', () => {
    const fervex = DrugFactory.createDrug('Fervex', 10, 50);
    fervex.updateBenefitValue();
    expect(fervex).toEqual(DrugFactory.createDrug('Fervex', 9, 50));
  });
});

describe('Magic Pill', () => {
  it('should keep its benefit and expire date', () => {
    const magicPill = DrugFactory.createDrug('Magic Pill', 11, 3);
    magicPill.updateBenefitValue();
    expect(magicPill).toEqual(DrugFactory.createDrug('Magic Pill', 11, 3));
  });
});

describe('Dafalgan', () => {
  it('should decrease the benefit and decrease expiresIn twice as fast as normal drugs', () => {
    const dafalgan = DrugFactory.createDrug('Dafalgan', 2, 3);
    dafalgan.updateBenefitValue();
    expect(dafalgan).toEqual(DrugFactory.createDrug('Dafalgan', 1, 1));
  });

  it('should decrease the benefit four times as fast when expired', () => {
    const dafalgan = DrugFactory.createDrug('Dafalgan', 0, 5);
    dafalgan.updateBenefitValue();
    expect(dafalgan).toEqual(DrugFactory.createDrug('Dafalgan', -1, 1));
  });
});

describe('Pharmacy', () => {
  it('should handle multiple drugs data update', () => {
    expect(new Pharmacy([DrugFactory.createDrug('Herbal Tea', 2, 3), DrugFactory.createDrug('Fervex', 2, 3)]).updateBenefitValue()).toEqual(
      [DrugFactory.createDrug('Herbal Tea', 1, 4), DrugFactory.createDrug('Fervex', 1, 6)],
    );
  });
});
