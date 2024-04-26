import rds from 'readline-sync';
import readJSON from './utils/readJSON.js';

export default function gameProccess() {
  console.log('Welcome to the Brain Games!');
  const users = readJSON('src/main_game/fixtures/users.json');
  const questions = readJSON('src/main_game/fixtures/questions.json');
  if (questions.length !== 0) {
    const randomQuestionIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomQuestionIndex];
    console.log(`Random Question: ${randomQuestion.question}`);
    const userAnswer = rds.question('Your answer: ');
    if (userAnswer === String(randomQuestion.correctAnswer)) {
      console.log('Correct!');
    } else {
      console.log(`'${userAnswer}' is wrooooong! Correct answer was '${randomQuestion.correctAnswer}'.`);
    }
  }
}

gameProccess();