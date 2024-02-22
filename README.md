# German Summarisation

Fast and Effective German Summarisation service with a Custom Large Language Transformer Backend

## Deployed Demo: [zusammenfassen.vercel.app](https://zusammenfassen.vercel.app/)
Note, there might be initial latency due to HuggingFace loading the model.

## Technologies Used
- HuggingFace Transformers
- PyTorch
- NextJs
- TailwindCSS
- DaisyUI
- FastUI

## Implementation Details

- A t5-small base transformer was fine-tuned on the german subset of the MLSUM dataset


## Instructions to Run 
- To run the NextJs frontend
```bash
cd frontend
npm install
npm run dev
```
