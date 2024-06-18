async function generateText() {
    const inputText = document.getElementById('inputText').value;
    const response = await fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputText: inputText })
    });
    
    const result = await response.json();
    const generatedTextDiv = document.getElementById('generatedText');
    
    if (response.ok) {
        generatedTextDiv.textContent = result.generatedText;
    } else {
        generatedTextDiv.textContent = 'Error: ' + result.error;
    }
}
