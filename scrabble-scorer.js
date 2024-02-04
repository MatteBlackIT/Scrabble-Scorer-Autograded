// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 
const input = require("readline-sync");


const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let newPointStructure = transform(oldPointStructure);
//----------------------------------------------------------------------------------------



const simplePointStructure = {
   1: ['A', 'B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
 };
//--------------------------------------------------------------------------------

const vowelBonusPointStructure = {
   1: ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'],
   3: ['A','E','I','O','U']
};
//----------------------------------------------------------------------------------------





function transform(oldPointStructure) {
   let newPointStructure = {};
      for (const score in oldPointStructure){
         for (const letter of oldPointStructure[score]){
            newPointStructure[letter.toLowerCase()] = parseInt(score);
         }
      } 
      return newPointStructure;         
};





//Scorer Functions
   function oldScrabbleScorer(word) {
	   word = word.toUpperCase();
	      let letterPoints = "";
 
	         for (let i = 0; i < word.length; i++) {
 
	         for (const pointValue in oldPointStructure) {
 
		         if (oldPointStructure[pointValue].includes(word[i])) {
			         letterPoints += `Point(s) for '${word[i]}': ${pointValue}\n`
		            }
 
	            }
	         }
	      return letterPoints;
      };
 
 //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
   
 
 function simpleScorer(word) {
   let score = word.length
     return score
   };

   function vowelBonusScorer(word) {
      word = word.toUpperCase();
      let score = 0;
      let vowels = ['A', 'E', 'I', 'O', 'U'];
         for (let i = 0; i<word.length; i++)

         if (vowels.includes(word[i])) {
            score += 3;
         } else {
            score += 1;
         }
      return score
       };

//<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
function scrabbleScorer(word) {
   word = word.toLowerCase();
   let score = 0;
 
   for (let i = 0; i < word.length; i++) {
     const letter = word[i];
 
   //   for (const letter in newPointStructure) {
 
		   if (newPointStructure.hasOwnProperty(letter)) {
			   score += newPointStructure[letter];
		   }
         
	    }
       return score;
     }

//<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //




function initialPrompt() {
  return input.question("Let's play some scrabble!\n\nEnter a word: ");

};

const scoringAlgorithms = [ 
{
   name: "Simple Scorer",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer,
},
{       
   name: "Bonus Vowel Scorer",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer,
},
{
   name: "New Scrabble Scorer",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer,
}         
];




function scorerPrompt(word) {
   console.log("Available Scoring Algorithms:\n");
  for (let i = 0; i < scoringAlgorithms.length; i++) {
    console.log(`${i}: ${scoringAlgorithms[i].name}`);
      
  }
console.log("\nEnter a number 0-2")
   let scoreSelection = input.question("\nChoose your Algo: ");
     while (scoreSelection === isNaN || scoreSelection > 2 || scoreSelection < 0) {
        scoreSelection = input.question("Invalid input! Please choose a number between 0-2. ");
         


     
        
      }
      console.log("algorithm name:", scoringAlgorithms[scoreSelection].name);
      console.log(`\nScore for ${word}:`, scoringAlgorithms[scoreSelection].scorerfunction(word));
  return scorerPrompt[scoringAlgorithms];
  };







function runProgram() {
  let word = initialPrompt();
   scorerPrompt(word);
}



// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
