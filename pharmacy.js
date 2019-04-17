export class Drug {
  constructor(name, expiresIn, benefit) {
    if (!Number.isInteger(expiresIn)) {
      throw Error('expiresIn should be a integer');
    }
    if (!Number.isInteger(benefit)) {
      throw Error('benefit should be a integer');
    }
    if (benefit > 50 || benefit < 0) {
      throw Error('benefit should be in the range [0, 50]');
    }
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  updateBenefitValue() {
    this.expiresIn += -1;
    this.benefit += (this.expiresIn < 0 ? -2 : -1);
    this.benefit = Math.max(this.benefit, 0);
  }
}

export class Doliprane extends Drug {
  constructor(expiresIn, benefit) {
    super('Doliprane', expiresIn, benefit);
  }
}

export class HerbalTea extends Drug {
  constructor(expiresIn, benefit) {
    super('Herbal Tea', expiresIn, benefit);
  }

  updateBenefitValue() {
    this.expiresIn += -1;
    this.benefit += (this.expiresIn < 0 ? 2 : 1);
    this.benefit = Math.min(this.benefit, 50);
  }
}

export class Fervex extends Drug {
  constructor(expiresIn, benefit) {
    super('Fervex', expiresIn, benefit);
  }

  updateBenefitValue() {
    let addendum = 1;
    addendum += (this.expiresIn < 11 ? 1 : 0);
    addendum += (this.expiresIn < 6 ? 1 : 0);
    this.expiresIn += -1;
    this.benefit = (this.expiresIn < 0 ? 0 : this.benefit + addendum);
    this.benefit = Math.max(this.benefit, 0);
    this.benefit = Math.min(this.benefit, 50);
  }
}

export class MagicPill extends Drug {
  constructor(expiresIn, benefit) {
    super('Magic Pill', expiresIn, benefit);
  }

  updateBenefitValue() {
    this.benefit = this.benefit;
    this.expiresIn = this.expiresIn;
  }
}

export class DrugFactory {
  static createDrug(name, expiresIn, benefit) {
    switch (name) {
      case 'Doliprane':
        return new Doliprane(expiresIn, benefit);
      case 'Herbal Tea':
        return new HerbalTea(expiresIn, benefit);
      case 'Fervex':
        return new Fervex(expiresIn, benefit);
      case 'Magic Pill':
        return new MagicPill(expiresIn, benefit);
      default:
        return new Drug(name, expiresIn, benefit);
    }
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    this.drugs.forEach((drug) => {
      drug.updateBenefitValue();
    });

    return this.drugs;
  }
}
