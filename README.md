# AI-Powered Email Reply Generator ✉️

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)  [![Stars](https://img.shields.io/github/stars/Kunal-109/AI-Powered-Email-Reply-generator)](https://github.com/Kunal-109/AI-Powered-Email-Reply-generator/stargazers)

## Description 📝

The AI-Powered Email Reply Generator is a project designed to simplify and expedite the process of responding to emails. It comprises a React-based frontend and a Spring Boot backend, leveraging AI to generate appropriate and tailored email replies based on the content of the original email and a user-specified tone.

## Table of Contents 🗂️

1.  [Features](#features-sparkles)
2.  [Tech Stack](#tech-stack-computer)
3.  [Installation](#installation-gear)
4.  [Usage](#usage-rocket)
5.  [Project Structure](#project-structure-file_folder)
6.  [API Reference](#api-reference-link)
7.  [Contributing](#contributing-handshake)
8.  [License](#license-copyright)
9.  [Important Links](#important-links-link)
10. [Footer](#footer-page_facing_up)

## Features ✨

*   **AI-Powered Reply Generation**: Utilizes AI (Gemini API) to generate email replies based on email content.
*   **Tone Selection**: Allows users to specify the tone of the generated reply (Professional, Friendly, Casual, or None).
*   **Gmail Extension**: A Chrome extension is available for direct integration with Gmail, enabling reply generation within the Gmail interface.
*   **React Frontend**: User-friendly interface built with React and Material UI.
*   **Spring Boot Backend**: Handles API requests and integrates with the AI model.
*   **Copy to Clipboard**: Easily copy the generated reply to the clipboard.

## Tech Stack 💻

*   **Frontend**: React, JavaScript, Vite, Material UI, Emotion
*   **Backend**: Java, Spring Boot
*   **AI**: Gemini API
*   **Other**: Maven

## Installation ⚙️

To set up the project locally, follow these steps:

### Frontend

1.  Navigate to the frontend directory:

    ```bash
    cd email-writer-sb/email-writer-frontend
    ```

2.  Install the dependencies:

    ```bash
    npm install
    ```

### Backend

1.  Navigate to the backend directory:

    ```bash
    cd email-writer-sb/email-writer-sb
    ```

2.  Build the project using Maven:

    ```bash
    mvn clean install
    ```

### API Key Setup

1.  Obtain a Gemini API key from Google.
2.  Set the `gemini.api.key` property in the `email-writer-sb/email-writer-sb/src/main/resources/application.properties` file:

    ```properties
    gemini.api.key=YOUR_GEMINI_API_KEY
    gemini.api.url=https://generativelanguage.googleapis.com
    ```

## Usage 🚀

### Running the Frontend

1.  Start the development server:

    ```bash
    cd email-writer-sb/email-writer-frontend
    npm run dev
    ```

2.  Open your browser and navigate to the address provided by Vite (usually `http://localhost:5173`).

### Running the Backend

1.  Navigate to the backend directory:

    ```bash
    cd email-writer-sb/email-writer-sb
    ```

2.  Run the Spring Boot application:

    ```bash
    mvn spring-boot:run
    ```

3.  The backend will be accessible at `http://localhost:8080`.

### Using the Extension

1.  Load the unpacked extension in Chrome:
    *   Go to `chrome://extensions/`.
    *   Enable "Developer mode".
    *   Click "Load unpacked" and select the `Email-Writer-EXT` directory.
2.  Open Gmail and compose a new email or reply to an existing one.
3.  The "AI Reply" button and tone dropdown will appear in the compose toolbar.
4.  Select a tone (optional) and click the "AI Reply" button to generate a reply.

### Real-World Use Case

Imagine you receive a lengthy email requesting your input on a project proposal. Instead of spending time crafting a detailed response, you can use the AI-Powered Email Reply Generator.

1.  Copy the email content into the "Original Email Content" field in the React frontend.
2.  Select a tone, such as "Professional".
3.  Click "Generate Reply".
4.  The AI will generate a professional and relevant email reply, which you can then copy and paste into your email.

## Project Structure 📂

```
AI-Powered-Email-Reply-generator/
├── Email-Writer-EXT/
│   ├── content.css
│   ├── content.js
│   └── manifest.json
├── email-writer-sb/
│   ├── email-writer-frontend/
│   │   ├── index.html
│   │   ├── eslint.config.js
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   ├── README.md
│   │   ├── src/
│   │   │   ├── App.css
│   │   │   ├── App.jsx
│   │   │   ├── index.css
│   │   │   └── main.jsx
│   ├── email-writer-sb/
│   │   ├── pom.xml
│   │   ├── mvnw
│   │   ├── mvnw.cmd
│   │   ├── .mvn/wrapper/maven-wrapper.properties
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   ├── java/com/email/writer/
│   │   │   │   │   ├── EmailGeneratorController.java
│   │   │   │   │   ├── EmailGeneratorService.java
│   │   │   │   │   ├── EmailRequest.java
│   │   │   │   │   └── EmailWriterSbApplication.java
│   │   │   │   └── resources/application.properties
│   │   │   └── test/
│   │   │   │   └── java/com/email/writer/EmailWriterSbApplicationTests.java
```

## API Reference 🔗

The backend exposes a single API endpoint for generating email replies.

*   **Endpoint**: `/api/email/generate`
*   **Method**: POST
*   **Request Body**: 

    ```json
    {
      "emailContent": "string",
      "tone": "string"  //Optional: "Professional", "Friendly", "Casual", or "None". Defaults to no tone if empty.
    }
    ```

*   **Response**: A string containing the generated email reply.

## Contributing 🤝

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request.

## License ⚖️

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Important Links 🔗

*   **Repository**: [https://github.com/Kunal-109/AI-Powered-Email-Reply-generator](https://github.com/Kunal-109/AI-Powered-Email-Reply-generator)

## Footer <footer>

AI-Powered-Email-Reply-generator - [https://github.com/Kunal-109/AI-Powered-Email-Reply-generator](https://github.com/Kunal-109/AI-Powered-Email-Reply-generator) by Kunal-109.  Give a ⭐, Fork 🍴, Raise Issues 🐛. Your support is highly appreciated! 😊
