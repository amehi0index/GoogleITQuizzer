# IT Quiz App

A React quiz application that allows users to select different modules and submodules, take quizzes, and receive feedback based on their answers. 
## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [How to Run](#how-to-run)
- [License](#license)

## Features
- **Dynamic Module Selection:** Users can choose from multiple modules and submodules.
- **Question Feedback:** Immediate feedback is provided after the quiz is completed, showing correct and incorrect answers.
- **Score Calculation:** Tracks the user’s score throughout the quiz.
- **Data-driven:** The app fetches questions and modules from a JSON file, making it easy to update and maintain.

## Getting Started

### Prerequisites
To run this project locally, you'll need to have the following installed:
- Node.js (v14 or above)
- npm or yarn

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/your-username/GoogleITQuizzer.git
   cd react-it-quiz
2. Install the dependencies:
    ```
    npm install
    # or
    yarn install
    ```
3. Start the devlopment server:
    ```
    npm run dev
    # or
    yarn dev
    ```

The application should now be running on http://localhost:5173 (or another port if specified by Vite).

### How to Run
1. Module Selection:

    * Start by selecting a module from the dropdown.
    * If the selected module contains submodules, another dropdown will appear for submodule selection.
2. Start Quiz:
    * Once a module/submodule is selected, click the "Start Quiz" button.
    * The quiz will begin, showing one question at a time.
3. Answering Questions:
    * Select an answer and proceed to the next question using the "Next" button.
4. Quiz Completion:
    * After completing the quiz, you’ll see your score and a detailed breakdown of correct and incorrect answers.

### License
This project is licensed under the MIT License. See the LICENSE file for more details.

This README provides instructions specific to a Vite project, including the `npm run dev` command to start the development server and reflects typical Vite project structure and configuration. Adjust any specific details as needed! 
