const { OpenAI } = require("openai");

module.exports = async function openAI(map) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Coba berikan saya agent komposisi yang terbaik untuk map ${map} dalam valorant. response yang panajang dalam bentuk JSON pakai bahasa indonesia. formatnya seperti ini : 
        {
            "result": {
            "map": "",
            "agentKomposisi": "",
            "alasan": "",
            "persentaseUntukMenang": "",
            "alasanPersentaseSegitu": ""
            ...
            }        
        }`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  //   console.log(completion.choices[0]);
  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
};
