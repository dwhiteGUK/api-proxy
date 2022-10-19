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

export default handler
