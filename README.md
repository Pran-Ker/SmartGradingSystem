# Automated Paper Grading System

This is an automated paper grading system built in Node.js, designed to understand examination papers using OCR, take answer keys from professors, and provide a score for each answer.

## Features

- Object Character Recognition (OCR) functionality to convert handwritten English from an image into text.
- Natural Language Processing (NLP) unit to compare inputted data with corresponding answers in exam sheets.
- Machine learning model to predict the score of an essay based on features extracted from preprocessed data.
- Domain ontology generation for creating a representation of concepts and relationships in essays.
- Web interface built with Django, HTML, CSS, and JavaScript for performing the grading process.
- Mobile application in development.
- Hosting on an online server.

## Prerequisites

- Node.js
- Python 3
- Django

## Installation

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Run the server with `node app.js`.

## Usage

1. Access the web interface in a browser at `http://localhost:3000`.
2. Upload a scanned exam sheet in image format.
3. Process the image using OCR and NLP to compare answers with the corresponding answer key.
4. Receive a score for each answer.

## Future Improvements

- Incorporate OCR functionality into the web interface.
- Add more essay-related functionality to the web interface.
- Complete development of the mobile application.
- Host the website on an online server.

## Contributors

- Prannay Hebbar

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
