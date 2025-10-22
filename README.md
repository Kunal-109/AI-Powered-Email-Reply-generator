# AI-Powered Email Reply Generator ✉️🤖

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)  
[![Stars](https://img.shields.io/github/stars/Kunal-109/AI-Powered-Email-Reply-generator)](https://github.com/Kunal-109/AI-Powered-Email-Reply-generator/stargazers)

> **A Chrome extension that generates intelligent email replies directly in Gmail using AI.**

## 🎯 Overview

AI-Powered Email Reply Generator is a Chrome extension that integrates seamlessly with Gmail to generate contextually appropriate email replies. Select your desired tone (Professional, Friendly, Casual) and let AI craft the perfect response instantly.

### ✨ Key Features

- 🔌 **Gmail Integration** - Reply button appears directly in Gmail's compose window
- 🎭 **Multiple Tones** - Choose from Professional, Friendly, Casual, or None
- ⚡ **Instant Generation** - AI-powered replies in seconds
- 🎨 **Native UI** - Blends seamlessly with Gmail's interface
- 📋 **One-Click Insert** - Generated reply inserts directly into compose box

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Extension** | Vanilla JavaScript, Chrome Extension API |
| **Backend** | Spring Boot, Java |
| **AI Model** | Google Gemini API |
| **Frontend (Demo)** | React, Vite, Material UI |

## 📦 Installation

### Prerequisites
- Java 17+
- Node.js 16+
- Maven
- Chrome Browser
- Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))

### 1️⃣ Setup Backend

```bash
# Navigate to backend directory
cd email-writer-sb/email-writer-sb

# Configure API key in application.properties
echo "gemini.api.key=YOUR_GEMINI_API_KEY" >> src/main/resources/application.properties
echo "gemini.api.url=https://generativelanguage.googleapis.com" >> src/main/resources/application.properties

# Build and run
mvn clean install
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`

### 2️⃣ Install Chrome Extension

```bash
# Open Chrome and navigate to
chrome://extensions/

# Enable "Developer mode" (top-right toggle)
# Click "Load unpacked"
# Select the Email-Writer-EXT folder
```

### 3️⃣ (Optional) Run Demo Frontend

```bash
cd email-writer-sb/email-writer-frontend
npm install
npm run dev
```

Demo UI available at `http://localhost:5173`

## 🚀 Usage

### Using the Extension in Gmail

1. **Open Gmail** and click "Compose" or "Reply"
2. **Select Tone** from the dropdown (Professional/Friendly/Casual)
3. **Click "AI Reply"** button
4. **AI generates** and inserts reply into compose box
5. **Edit if needed** and send!

![Extension Demo](https://via.placeholder.com/800x400?text=Extension+Demo)

### Using the Demo Frontend

1. Paste original email content
2. Select desired tone
3. Click "Generate Reply"
4. Copy generated reply to clipboard

## 📁 Project Structure

```
AI-Powered-Email-Reply-generator/
├── Email-Writer-EXT/              # Chrome Extension
│   ├── manifest.json              # Extension configuration
│   ├── content.js                 # Gmail integration logic
│   └── content.css                # Styling for extension UI
│
├── email-writer-sb/
│   ├── email-writer-frontend/     # Demo React UI
│   │   ├── src/
│   │   │   ├── App.jsx            # Main component
│   │   │   └── main.jsx
│   │   ├── package.json
│   │   └── vite.config.js
│   │
│   └── email-writer-sb/           # Spring Boot Backend
│       ├── src/main/java/com/email/writer/
│       │   ├── EmailGeneratorController.java    # REST API
│       │   ├── EmailGeneratorService.java       # AI integration
│       │   ├── EmailRequest.java                # Request model
│       │   └── EmailWriterSbApplication.java
│       └── src/main/resources/
│           └── application.properties           # Config
```

## 🔌 API Reference

### Generate Email Reply

**Endpoint:** `POST /api/email/generate`

**Request Body:**
```json
{
  "emailContent": "Original email text here",
  "tone": "Professional"
}
```

**Tone Options:** `Professional` | `Friendly` | `Casual` | `None`

**Response:** Plain text email reply

**Example:**
```bash
curl -X POST http://localhost:8080/api/email/generate \
  -H "Content-Type: application/json" \
  -d '{
    "emailContent": "Can we schedule a meeting next week?",
    "tone": "Professional"
  }'
```

## 🎨 Extension Features

### UI Components
- **Tone Dropdown** - Select reply style before generation
- **AI Reply Button** - Triggers reply generation
- **Loading State** - Visual feedback during generation
- **Error Handling** - User-friendly error messages

### Integration Points
- Detects Gmail compose window automatically
- Injects UI into Gmail's native toolbar
- Preserves Gmail's styling and UX
- Works with both new emails and replies

## 🤝 Contributing

Contributions are welcome! 

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🔗 Links

- **Repository:** [GitHub](https://github.com/Kunal-109/AI-Powered-Email-Reply-generator)
- **Issues:** [Report Bug](https://github.com/Kunal-109/AI-Powered-Email-Reply-generator/issues)
- **Gemini API:** [Get API Key](https://makersuite.google.com/app/apikey)

---

<div align="center">

### 💡 Built by [Kunal-109](https://github.com/Kunal-109)

Give a ⭐ if this project helped you! | Fork 🍴 to contribute | Report 🐛 issues

**[⬆ Back to Top](#ai-powered-email-reply-generator-️)**

</div>
