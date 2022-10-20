const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}

async function handler(req, res) {
  try {
    if (!req?.body?.url) {
      throw new Error('URL not defined')
    }

    const resp = await fetch(req.body.url, options).catch((err) => {
      console.error(err)
      throw new Error('Failed to fetch API')
    })

    const json = await resp.json()

    return res.status(200).json(json)
  } catch (error) {
    console.error(error)
    return res.status(400).json(error)
  }
}

export default allowCors(handler)
