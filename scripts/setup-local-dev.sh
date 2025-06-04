#!/bin/bash
set -e

echo "🚀 Setting up vibe-cli agentic development environment..."

# Check prerequisites
command -v docker >/dev/null 2>&1 || { echo "❌ Docker required" >&2; exit 1; }
command -v pnpm >/dev/null 2>&1 || { echo "❌ PNPM required" >&2; exit 1; }

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Start services
echo "🐳 Starting Redis and Ollama..."
docker-compose -f docker-compose.local.yml up -d

# Wait for Redis
echo "⏳ Waiting for Redis..."
until docker exec vibe-redis redis-cli ping > /dev/null 2>&1; do sleep 1; done

# Wait for Ollama
echo "⏳ Waiting for Ollama..."
until docker exec vibe-ollama ollama list > /dev/null 2>&1; do sleep 2; done

# Pull models
echo "📥 Pulling AI models..."
docker exec vibe-ollama ollama pull mixtral:8x7b-q4 &
docker exec vibe-ollama ollama pull mistral:7b-q4 &
wait

# Setup environment
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✏️ Edit .env file for your configuration"
fi

echo "✅ Setup complete!"
echo "• Visit http://localhost:8001 for Redis UI"
