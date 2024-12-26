import random

class QuizGenerator:
    def __init__(self):
        self.questions = [
            {
                "question": "What is logic programming?",
                "options": [
                    "A programming paradigm based on formal logic",
                    "A type of machine learning algorithm",
                    "A method for designing user interfaces",
                    "A technique for optimizing database queries"
                ],
                "correct_answer": 0
            },
            {
                "question": "Which of the following is a logic programming language?",
                "options": [
                    "Python",
                    "Java",
                    "Prolog",
                    "C++"
                ],
                "correct_answer": 2
            },
            {
                "question": "What is a predicate in logic programming?",
                "options": [
                    "A variable that can only be true or false",
                    "A function that returns a boolean value",
                    "A statement about objects and their relationships",
                    "A conditional statement in an if-then-else structure"
                ],
                "correct_answer": 2
            },
            {
                "question": "What does unification do in logic programming?",
                "options": [
                    "Combines two programs into one",
                    "Matches variables with constants or other variables",
                    "Converts logical expressions to machine code",
                    "Optimizes the execution of logical rules"
                ],
                "correct_answer": 1
            },
            {
                "question": "What is backtracking in logic programming?",
                "options": [
                    "A method for undoing changes in version control",
                    "A technique for optimizing recursive functions",
                    "A process of trying alternative solutions when a goal fails",
                    "A way to reverse the order of execution in a program"
                ],
                "correct_answer": 2
            }
        ]

    def generate_quiz(self, num_questions=5):
        return random.sample(self.questions, min(num_questions, len(self.questions)))

# Demo
quiz_gen = QuizGenerator()
quiz = quiz_gen.generate_quiz(3)

for i, q in enumerate(quiz, 1):
    print(f"Q{i}: {q['question']}")
    for j, option in enumerate(q['options']):
        print(f"  {chr(97+j)}) {option}")
    print(f"Correct answer: {chr(97+q['correct_answer'])}")
    print()

