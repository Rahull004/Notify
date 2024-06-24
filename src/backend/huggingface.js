import { HfInference } from '@huggingface/inference';
import { config } from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
config();

const app = express();
const port = 3000;
const HF_TOKEN = process.env.HF_ACCESS_TOKEN; 

app.use(cors())
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/generate', async (req, res) => {
  const { inputText } = req.body;
  const inference = new HfInference(HF_TOKEN);

  const parameters = {
      max_length: 100, // Maximum length of the generated text
      num_return_sequences: 1, // Number of generated sequences
      temperature: 0.3, // Lower temperature for more deterministic output
      top_p: 0.9, // Only consider the top 90% probability mass
      top_k: 50 // Only consider the top 50 tokens
  };

  try {
      const result = await inference.textGeneration({
          model: 'meta-llama/Meta-Llama-3-8B-Instruct',
          inputs: inputText,
          parameters: parameters
      });

      if (result && result.generated_text) {
        const generatedText = result.generated_text.substring((inputText.length)+1).trim();
          res.json({ generatedText: generatedText});
      } else {
          res.status(500).json({ error: 'No text was generated. Please try again.' });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Chatbot Running`);
});
