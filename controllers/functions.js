var Function = require('../models/function');


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function explain(req, res) {
  const reqPromp = `${req.headers.code}`
  console.log(req.headers.code);
  const response = await openai.createCompletion("text-davinci-002", {
    prompt: req.headers.code,
    temperature: 0.7,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["\"\"\""],
  });
  console.log(response.data);


  res.send(response.data);
}

async function getTimeComplexity(req, res) {
  const reqPromp = `${req.headers.code}`
  console.log(req.headers.code);
  const response = await openai.createCompletion("text-davinci-002", {
    prompt: req.headers.code,
    temperature: 0,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["\n"],
  });

  console.log(response.data);
  res.send(response.data);
}

async function createf(req, res) {
  console.log('user: ', req.user)
  try {
    await Function.create(req.body);
    // Use the highScores action to return the list
    allFuncs(req, res);
  } catch (err) {
    res.json({ err });
  }
}

async function allFuncs(req, res) {
  const scores = await Function.find({})
    .sort()
    // Default to a limit of 20 high scores
    // if not specified in a query string
    .limit(req.query.limit || 20);
  res.json(scores);
}



module.exports = {
  createf,
  allFuncs,
  explain,
  getTimeComplexity
};


