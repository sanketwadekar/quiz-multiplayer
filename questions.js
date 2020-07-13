const questions = [
  {
    id: "1",
    text: "Which of these is not a programming language?",
    choices: [
      { id: "a", text: "JavaScript" },
      { id: "b", text: "Java" },
      { id: "c", text: "NodeJS" },
      { id: "d", text: "TypeScript" },
    ],
    correct: "c",
  },
  {
    id: "2",
    text: "Which of the following is not a valid Javascipt variable name ?",
    choices: [
      { id: "a", text: "var1" },
      { id: "b", text: "var_1" },
      { id: "c", text: "Var1" },
      { id: "d", text: "var-1" },
    ],
    correct: "d",
  },
  {
    id: "3",
    text: "Who is the creator of JavaScript?",
    choices: [
      { id: "a", text: "Brendan Eich" },
      { id: "b", text: "Guido van Rossum" },
      { id: "c", text: "Dennis Ritchie" },
      { id: "d", text: "James Gosling" },
    ],
    correct: "a",
  },
  {
    id: "4",
    text: "What is the type of 'NaN' in JavaScript ?",
    choices: [
      { id: "a", text: "object" },
      { id: "b", text: "number" },
      { id: "c", text: "undefined" },
      { id: "d", text: "other" },
    ],
    correct: "b",
  },
  {
    id: "5",
    text:
      "Consider a JavaScript statement 'var num = 9 ?? 3'What will be the value of the variable num ?",
    choices: [
      { id: "a", text: "3" },
      { id: "b", text: "null" },
      { id: "c", text: "9" },
      { id: "d", text: "none of these" },
    ],
    correct: "c",
  },
  {
    id: "6",
    text: "What does the expression 'typeof(class User{});' return ?",
    choices: [
      { id: "a", text: "object" },
      { id: "b", text: "class" },
      { id: "c", text: "function" },
      { id: "d", text: "none of these" },
    ],
    correct: "c",
  },
  {
    id: "7",
    text: "What is the size of Number in Javascript ?",
    choices: [
      { id: "a", text: "32 Bit" },
      { id: "b", text: "16 Bit" },
      { id: "c", text: "64 Bit" },
      { id: "d", text: "8 Bit" },
    ],
    correct: "c",
  },
  {
    id: "8",
    text: "What is the truth value of the expression (9 == '9') in JavaScript?",
    choices: [
      { id: "a", text: "true" },
      { id: "b", text: "false" },
    ],
    correct: "a",
  },
  {
    id: "9",
    text: "Which of the following is a reserved keyword in JavaScript ?",
    choices: [
      { id: "a", text: "yield" },
      { id: "b", text: "extern" },
      { id: "c", text: "implement" },
      { id: "d", text: "destroy" },
    ],
    correct: "a",
  },
  {
    id: "10",
    text: "Which of the following is not an HTML tag ?",
    choices: [
      { id: "a", text: "<legend>" },
      { id: "b", text: "<article>" },
      { id: "c", text: "<tr>" },
      { id: "d", text: "<heading>" },
    ],
    correct: "d",
  },
];

module.exports =  questions;
