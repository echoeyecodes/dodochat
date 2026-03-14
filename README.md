# DodoChat

DodoChat is my playground for exploring LLM runtimes, streaming interactions, and complex tool-calling patterns. I started this project because I wanted to understand what it actually feels like to build a real application around large language models—beyond just standard chat prompts.

It's not a polished SaaS product. It's an ongoing experiment where I test ideas, break things, and see how far I can push current AI models in a production-like environment.

![DodoChat Interface](website/public/screenshot_87121.jpeg)

## The Focus

The project is primarily about the details that make AI feel less like a black box and more like a tool:
- **Fast Streaming**: Token-by-token responses for a responsive feel.
- **Tool Intelligence**: Giving the model the ability to "do things" (process files, search databases, transform images).
- **Persistent Context**: Maintaining a clean, indexed conversation history.

## What's Inside

- **Document Intelligence & RAG**: Uses vector embeddings to index and search uploaded documents, providing the model with accurate local context.
- **File Generation**: The AI can generate `.txt` and `.pdf` files on the fly based on your conversation.
- **Image & Media Reasoning**: Handles multi-modal inputs natively. It can search IGDB for gaming data or use `sharp` to apply transformations to images.
- **Personal API Keys (BYOK)**: Users can opt to use their own Gemini API keys, which are stored with AES-256 encryption. This bypasses system-wide rate limits.
- **Gaming Integration**: Supports integration with the IGDB database for reasoning about games, screenshots, and release history.

## The Stack

- **Runtime**: Bun + Node.js
- **Intelligence**: Google Gemini (Flash, Text-Embedding-001)
- **Orchestra**: Vercel AI SDK
- **Frontend**: React, Vite, TanStack Router, Tailwind CSS
- **Processing**: Sharp (Images), MongoDB (Database)

## Getting Started

You'll need [Bun](https://bun.sh) installed.

### 1. Clone & Install

```bash
git clone https://github.com/echoeyecodes/dodochat.git
cd dodochat
bun install
```

### 2. Environment Setup

You'll need to set up environment variables for both the `server` and the `website`.

#### Server (`server/.env`)
```bash
cd server
cp .env.sample .env
```
Key requirements:
- `GOOGLE_GENERATIVE_AI_API_KEY`: Get one from [Google AI Studio](https://aistudio.google.com/).
- `USER_GEMINI_TOKEN_SECRET`: A random string used to encrypt user-provided API keys.
- `MONGODB_URI`: Your MongoDB connection string.
- **Firebase Admin**: Used for server-side auth verification. You'll need `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY`. **Note**: The private key must be base64 encoded to avoid multiline issues in environment variables.
- `IGDB_CLIENT_ID` & `IGDB_CLIENT_SECRET`: Optional, for gaming data features.

#### Website (`website/.env`)
```bash
cd website
cp .env.sample .env
```
Key requirements:
- **Firebase Config**: Standard Firebase web configuration (`FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, etc.) to handle client-side authentication.
- `BASE_API_URL`: Should point to your running server (default: `http://localhost:3001`).

### 3. Run it

From the root directory:

```bash
# Run both web and server concurrently
bun run dev
```

Or run them separately:
- `bun run dev:web`
- `bun run dev:srv`

## License

## Contributing

You're welcome to poke around the architecture, see how the tool calling is implemented, or use parts of it for your own experiments!
