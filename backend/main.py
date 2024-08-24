from fastapi import FastAPI, HTTPException
from contextlib import asynccontextmanager
from spacy.lang.de import German
from textblob import TextBlob
from textstat import flesch_kincaid_grade, gunning_fog
from pydantic import BaseModel
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
import math
import nltk

app = FastAPI()

# Pre-load German model and stopwords
nlp_models = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load the German NLP pipeline
    nlp_models["german_nlp"] = German()
    nlp_models["german_nlp"].add_pipe('sentencizer')

    # Load the summarization model and tokenizer
    nlp_models['model'] = AutoModelForSeq2SeqLM.from_pretrained("mach-12/t5-small-finetuned-mlsum-de")
    nlp_models['tokenizer'] = AutoTokenizer.from_pretrained("mach-12/t5-small-finetuned-mlsum-de")

    try:
        nltk.corpus.stopwords.words("german")
    except LookupError:
        nltk.download("stopwords")
    yield

    # Cleanup
    nlp_models.clear()

app = FastAPI(lifespan=lifespan)

class TextModel(BaseModel):
    text: str

class SummarizationParams(BaseModel):
    text: str
    max_length: int = 1000
    num_beams: int = 4
    no_repeat_ngram_size: int = 2

class GermanTextAnalyzer():
    def __init__(self, text: str):
        self.doc = nlp_models["german_nlp"](text)  # Process the text using the pre-loaded NLP model

    def analyze(self):
        results = {
            'word_count': len(self.doc),
            'sentence_count': len(list(self.doc.sents)),
            'avg_word_length': self.avg_word_length(),
            'fk_grade': flesch_kincaid_grade(self.doc.text),
            'gf_index': gunning_fog(self.doc.text),
            'sentence_complexity': self.sentence_complexity(),
            'lexical_diversity': self.lexical_diversity(),
            'sentiment': self.sentiment(),
        }
        
        # Round off values
        keys_to_round = ['fk_grade', 'gf_index', 'lexical_diversity', 'sentiment', 'avg_word_length']

        for key in keys_to_round:
            if key in results and isinstance(results[key], float):
                value = results[key]
                if value != 0: 
                    try:
                        significant_digits = 3 - int(math.floor(math.log10(abs(value)))) - 1
                        results[key] = round(value, significant_digits)
                    except ValueError:
                        results[key] = round(value, 3)  # Fallback to simple rounding if error occurs
                else:
                    results[key] = round(value, 3)  # Handle zero case
        
        return results


    def avg_word_length(self):
        words = [token.text for token in self.doc if not token.is_punct]
        total_length = sum(len(word) for word in words)
        return total_length / len(words) if words else 0
    
    def sentence_complexity(self):
        sentences = list(self.doc.sents)
        total_words = sum(len(sentence) for sentence in sentences)
        return total_words / len(sentences) if sentences else 0
    
    def lexical_diversity(self):
        words = [token.text.lower() for token in self.doc if not token.is_punct]
        return len(set(words)) / len(words) if words else 0
    
    def sentiment(self):
        blob = TextBlob(self.doc.text)
        return blob.sentiment.polarity

@app.get("/")
def health():
    return "Sentiment Analysis API is healthy"
    
@app.post("/analyze/")
async def analyze_text(text_data: TextModel):
    text = text_data.text
    
    if not text:
        raise HTTPException(status_code=400, detail="No text provided")
    try:
        analyzer = GermanTextAnalyzer(text)
        return analyzer.analyze()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate-summary/")
async def generate_summary(params: SummarizationParams):
    tokenizer = nlp_models['tokenizer']
    model = nlp_models['model']

    if not params.text:
        raise HTTPException(status_code=400, detail="No text provided")
    
    input_prompt = f"summarize: {params.text}"
    input_ids = tokenizer(input_prompt, return_tensors="pt")["input_ids"]
    
    try:
        # Generate predictions using the model
        output = model.generate(
            input_ids=input_ids,
            max_length=params.max_length,
            num_beams=params.num_beams,
            no_repeat_ngram_size=params.no_repeat_ngram_size
        )

        # Decode the generated text tokens back to human-readable text
        predicted_text = tokenizer.decode(output[0], skip_special_tokens=True)
        return {"summary": predicted_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
