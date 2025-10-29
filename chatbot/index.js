const input = document.querySelector('#input');
const ask = document.querySelector('#ask');
const chatContainer = document.querySelector('#chat-container');

const threadid = Date.now().toString(36) + Math.random().toString(36).substring(2, 15);
ask.addEventListener('click', handleAsk);

input.addEventListener('keyup', (event) => {
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

    const msg = document.createElement('div');
    msg.className = 'my-6 bg-neutral-800 p-3 rounded-xl ml-auto max-w-fit'
    msg.textContent = text;
    chatContainer.appendChild(msg);
    input.value = '';
   
    const response = await servercall(text);
    const assistantMsg = document.createElement('div');
    assistantMsg.className = 'max-w-fit'
    assistantMsg.textContent = response;
    chatContainer.appendChild(assistantMsg);
}

async function servercall(text) {
    const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, threadid }),
    });
    if (!response.ok) {
        throw new Error('Failed to generate response');
    }
    const data = await response.json();
    return data.message;
}