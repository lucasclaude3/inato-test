export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  updateBenefitValue() {
    if (this.name !== 'Herbal Tea' && this.name !== 'Fervex') {
      if (this.benefit > 0) {
        if (this.name !== 'Magic Pill') {
          this.benefit += -1;
        }
      }
    } else if (this.benefit < 50) {
      this.benefit += 1;
      if (this.name === 'Fervex') {
        if (this.expiresIn < 11) {
          if (this.benefit < 50) {
            this.benefit += 1;
          }
        }
        if (this.expiresIn < 6) {
          if (this.benefit < 50) {
            this.benefit += 1;
          }
        }
      }
    }

    if (this.name !== 'Magic Pill') {
      this.expiresIn += -1;
    }

    if (this.expiresIn < 0) {
      if (this.name !== 'Herbal Tea') {
        if (this.name !== 'Fervex') {
          if (this.benefit > 0) {
            if (this.name !== 'Magic Pill') {
              this.benefit += -1;
            }
          }
        } else {
          this.benefit = 0;
        }
      } else if (this.benefit < 50) {
        this.benefit += 1;
      }
    }
  }
}

export class Doliprane extends Drug {
  constructor(expiresIn, benefit) {
    super('Doliprane', expiresIn, benefit);
  }

  updateBenefitValue() {
    if (this.benefit > 0) {
      this.benefit += -1;
    }

    this.expiresIn += -1;

    if (this.expiresIn < 0 && this.benefit > 0) {
      this.benefit += -1;
    }
  }
}

export class HerbalTea extends Drug {
  constructor(expiresIn, benefit) {
    super('Herbal Tea', expiresIn, benefit);
  }

  updateBenefitValue() {
    if (this.benefit < 50) {
      this.benefit += 1;
    }

    this.expiresIn += -1;

    if (this.expiresIn < 0 && this.benefit < 50) {
      this.benefit += 1;
    }
  }
}

export class Fervex extends Drug {
  constructor(expiresIn, benefit) {
    super('Fervex', expiresIn, benefit);
  }

  updateBenefitValue() {
    if (this.benefit < 50) {
      this.benefit += 1;
      if (this.expiresIn < 11 && this.benefit < 50) {
        this.benefit += 1;
      }
      if (this.expiresIn < 6 && this.benefit < 50) {
        this.benefit += 1;
      }
    }

    this.expiresIn = this.expiresIn - 1;

    if (this.expiresIn < 0) {
      this.benefit = 0;
    }
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
