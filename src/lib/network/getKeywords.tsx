export const getKeyword = async () => {
  const response = await fetch("http://127.0.0.1:5000/ping")
  //   const response = await fetch("https://tawnkryer-gfmvm7kfdq-uc.a.run.app/ping")
  if (!response.ok) throw new Error("Failed to fetch data")
  return response.json()
}

export const getOutLineForMultiKeyword = async (
  input: any,
  account: any,
  project: any
) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input, account, project }),
  }
  const response = await fetch(
    "http://127.0.0.1:5000/multi-Keyword-outline",
    requestOptions
  )

  const data = await response.json()
  console.log("This is the response ====", data)
}

export const adWordAuth = async () => {
  const response = await fetch("http://127.0.0.1:5000/ping")
  //   const response = await fetch("https://tawnkryer-gfmvm7kfdq-uc.a.run.app/ping")
  if (!response.ok) throw new Error("Failed to fetch data")
  return response.json()
}
