"use server";
export async function summarize(data: string) {
  const response = await fetch(
    process.env.BACKEND_API_URL + "/generate-summary/",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: data,
        max_length: 1000,
        num_beams: 4,
        no_repeat_ngram_size: 2,
      }),
    }
  );
  const result = await response.json();
  return result;
}

export async function analyze_sentiment(data: string) {
  const response = await fetch(process.env.BACKEND_API_URL + "/analyze/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: data }),
  });
  const result = await response.json();
  return result;
}
