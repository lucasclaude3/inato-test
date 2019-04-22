import fs from 'fs';
import { DrugFactory, Pharmacy } from './pharmacy';

const drugs = [
  DrugFactory.createDrug('Doliprane', 20, 30),
  DrugFactory.createDrug('Herbal Tea', 10, 5),
  DrugFactory.createDrug('Fervex', 5, 40),
  DrugFactory.createDrug('Magic Pill', 15, 40),
];
const trial = new Pharmacy(drugs);

const log = [];

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays += 1) {
  log.push(JSON.stringify(trial.updateBenefitValue()));
}

/* eslint-disable no-console */
fs.writeFile('assets/output.txt', log, (err) => {
  if (err) {
    console.log('error');
  } else {
    console.log('success');
  }
});
/* eslint-enable no-console */
