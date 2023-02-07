// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string,
  itinerary: any,
}

const GPT_KEY = process.env.GPT_API_KEY

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${GPT_KEY}`
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let content = '你好', subject = '生物', parsing='不需要'
  if (req.body) {
    let body = JSON.parse(req.body)
    content = body.content ||content
    subject = body.subject ||subject
    parsing = body.parsing ||parsing
  }

  let basePrompt = `我想咨询关于${subject}学科的问题，问题内容是：${content}，${parsing}详细解析。如果问题内容和${subject}学科无关，请拒绝回答。 `
  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: basePrompt,
        temperature: 0,
        max_tokens: 600
      })
    })
    try{
      const itinerary = await response.json()
      res.status(200).json({
        message: 'success',
        itinerary: itinerary.choices[0].text
      })
    }catch (err) {
      console.log('error: ', err)
    }
  } catch (err) {
    console.log('error: ', err)
  }
}
