import { MongoClient, ServerApiVersion } from 'mongodb'
import { config } from 'dotenv'

config()

const client = new MongoClient(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
})

const addFood = async data => {
  try {
    await client.connect()

    return await client.db('meals').collection('food').insertOne(data)
  } finally {
    await client.close()
  }
}

export default async function handler(req, res) {
  try {
    const body = JSON.parse(req.body)

    const properties = [
      { key: 'name', type: 'string' },
      { key: 'amount', type: 'number' },
      { key: 'unit', type: 'string' },
      { key: 'calories', type: 'number' },
      { key: 'fat', type: 'number' },
      { key: 'carbs', type: 'number' },
      { key: 'protein', type: 'number' }
    ]

    const data = Object.fromEntries(
      properties.map(property => {
        if (!body[property.key]) {
          throw {
            errorCode: 1,
            errorMessage: `Must provide a value for ${property.key}`
          }
        }

        if (property.type === 'number') {
          const number = parseFloat(body[property.key])

          if (isNaN(number)) {
            throw {
              errorCode: 2,
              errorMessage: `${property.key} must be of type: "number"`
            }
          }

          return [property.key, number]
        }

        return [property.key, body[property.key]]
      })
    )

    const result = await addFood(data)

    res.status(200).json({ result })
  } catch (error) {
    res.status(400).json(error)
  }
}
