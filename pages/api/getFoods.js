import { MongoClient, ServerApiVersion } from 'mongodb'
import { config } from 'dotenv'

config()

const client = new MongoClient(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
})

export default function handler(req, res) {
  client.connect(async err => {
    const collection = client.db('meals').collection('food')
    const docs = await collection.find({}).toArray()

    res.json({ docs })

    client.close()
  })
}
