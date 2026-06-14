import json

phase4 = {
    "id": "phase-4",
    "title": "Phase 4: LLM API Mastery (Claude/OpenAI)",
    "description": "Master LLM APIs from first API call to production-ready applications with Claude and OpenAI.",
    "difficulty": "Intermediate",
    "topics": []
}

# All 8 topics will be added here
topics_data = [
    # Topic 1
    {
        "id": "phase-4-topic-1",
        "title": "Your First API Call",
        "overview": "Get API keys, install SDKs, and make your first successful call to Claude or OpenAI.",
        "estimatedHours": 1.5,
        "difficulty": "Beginner",
        "detailedNotes": """# Your First API Call

Let's make your first LLM API call!

## Getting API Keys

**Anthropic (Claude):**
1. Go to console.anthropic.com
2. Sign up/login
3. Navigate to API Keys
4. Create new key
5. Copy and save securely

**OpenAI (GPT):**
1. Go to platform.openai.com
2. Sign up/login  
3. Navigate to API Keys
4. Create new key
5. Copy and save securely

## Installation

```bash
# Anthropic SDK
pip install anthropic

# OpenAI SDK
pip install openai

# Environment variables
pip install python-dotenv
```

## Setup .env File

```
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
```

## First Claude Call

```python
import os
from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()

client = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello, Claude!"}
    ]
)

print(message.content[0].text)
```

## First OpenAI Call

```python
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "user", "content": "Hello, GPT!"}
    ]
)

print(response.choices[0].message.content)
```

## Understanding the Response

**Claude response structure:**
```python
{
    'id': 'msg_...',
    'type': 'message',
    'role': 'assistant',
    'content': [{'type': 'text', 'text': 'Hello! How can I help?'}],
    'model': 'claude-3-5-sonnet-20241022',
    'usage': {'input_tokens': 10, 'output_tokens': 20}
}
```

**OpenAI response structure:**
```python
{
    'id': 'chatcmpl-...',
    'object': 'chat.completion',
    'created': 1234567890,
    'model': 'gpt-4',
    'choices': [{
        'message': {'role': 'assistant', 'content': 'Hello!'},
        'finish_reason': 'stop'
    }],
    'usage': {'prompt_tokens': 10, 'completion_tokens': 5}
}
```

## Error Handling

```python
from anthropic import Anthropic, APIError

try:
    message = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1024,
        messages=[{"role": "user", "content": "Hello"}]
    )
    print(message.content[0].text)
except APIError as e:
    print(f"API Error: {e}")
```

## Common Issues

1. **Invalid API key**: Check .env file
2. **Rate limit**: Wait and retry
3. **Model not found**: Check model name
4. **Timeout**: Increase timeout parameter""",
        "keyConcepts": ["API keys", "SDK installation", "First API call", "Response structure", "Error handling"],
        "resources": [
            {"type": "article", "title": "Anthropic API Docs", "url": "https://docs.anthropic.com/", "source": "Anthropic"},
            {"type": "article", "title": "OpenAI API Docs", "url": "https://platform.openai.com/docs/", "source": "OpenAI"}
        ],
        "practiceExercise": "Make your first API call to both Claude and OpenAI. Print the response and token usage. Handle errors gracefully.",
        "prerequisites": ["phase-3-topic-3"],
        "nextTopics": ["phase-4-topic-2"]
    }
]

phase4["topics"] = topics_data

with open('phase-4.json', 'w', encoding='utf-8') as f:
    json.dump(phase4, f, indent=2, ensure_ascii=False)

print("Phase 4 JSON created with 1 topic. Will add remaining 7 topics...")

# Made with Bob
