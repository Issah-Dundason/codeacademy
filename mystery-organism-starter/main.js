// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};



const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      let dnaBases = ['A', 'T', 'C', 'G'];
      let index = Math.floor(Math.random() * dna.length);
      dnaBases = dnaBases.filter(base => base !== dna[index]);
      dna[index] = dnaBases[Math.floor(Math.random() * dnaBases.length)];
      return dna;
    },
    compareDNA(aequor) {
      let score = 0;

      for(let i = 0; i < dna.length; i++) {
        if(dna[i] === aequor.dna[i])
          score++;
      }
      console.log(`specimen #${specimenNum} and specimen #${aequor.specimenNum} have ${Math.floor((score / dna.length) * 100)}% DNA in common`)
    },
    willLikelySurvive() {
      let gScore = 0;
      let cScore = 0;
      for(let i = 0; i < dna.length; i++) {
        if(dna[i] === 'C')
          cScore++;
        if(dna[i] === 'G')
          gScore++;
      }
      let gPercentage = Math.floor((gScore / dna.length) * 100);
      let cPercentage = Math.floor((cScore / dna.length) * 100);
      
      return gPercentage >= 60 || cPercentage >= 60;
    }
  }
}

const aequorMutant1 = pAequorFactory(1, mockUpStrand());
const aequorMutant2 = pAequorFactory(2, mockUpStrand());

aequorMutant1.mutate();
aequorMutant1.compareDNA(aequorMutant2);
console.log(aequorMutant1.willLikelySurvive());

let count = 1;
const survivingSpecimen = [];

while(survivingSpecimen.length < 30) {
  let newAequor = pAequorFactory(count, mockUpStrand());
  if(newAequor.willLikelySurvive()) {
    survivingSpecimen.push(newAequor);
  }
  count++;
}

console.log(survivingSpecimen);
