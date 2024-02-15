"use server";
export async function query(data: string) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/mach-12/t5-small-finetuned-mlsum-de",
    {
      headers: { Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}` },
      method: "POST",
      body: JSON.stringify(data),
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
}
