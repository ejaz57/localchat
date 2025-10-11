 # LocalChat 🌐

> A private web interface for local LLMs. Works with Ollama, LM Studio, and any OpenAI-compatible API.

![LocalChat Screenshot](https://github.com/your-username/localchat/raw/main/screenshot.png)

## ✨ Peculiarities
- 🔒 Complete privacy—everything works locally
- 🎨 Dark/light theme (automatic by system)
- 📝 Markdown and code highlighting support
- 🕒 Chat history (in `localStorage`)
- 🧠 Select a model from the list (Ollama)
- 📱 Responsive design

## 🚀 Installation

### Requirements
- [Node.js 18+](https://nodejs.org/)
- [Ollama](https://ollama.com/) (or another OpenAI-compatible server)

### Local launch
~~~bash
git clone https://github.com/your-username/localchat.git
cd localchat
npm install
npm run dev
~~~

Open <a href="http://localhost:5173"></a>

### Docker
~~~bash
docker build -t localchat .
docker run -p 3000:3000 --network host localchat
~~~
## ⚙️ Setting up

**By default, it connects to:**

- API: `http://localhost:11434` (Ollama)
- Model: `llama3`

**You can change it in the interface (drop-down list of models) or through environment variables:**
~~~bash
OLLAMA_BASE_URL=http://192.168.1.100:11434 npm run dev
~~~

## 📄 MIT License
