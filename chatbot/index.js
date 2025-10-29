const input = document.querySelector('#input');
const ask = document.querySelector('#ask');
const chatContainer = document.querySelector('#chat-container');

ask.addEventListener('click', handleAsk);

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleAsk();
    }
});

async function handleAsk() {
  const text = input?.value.trim();
  if (!text) {
    return;
  }

  await generateResponse(text);
}

async function generateResponse(text) {
    const response = await fetch('https://localhost:8000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    });
    if (!response.ok) {
        throw new Error('Failed to generate response');
    }
    const data = await response.json();
    return data.message;
}
