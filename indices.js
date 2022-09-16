const config = require('./config');

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: config.node,
  auth: config.auth,
  tls: config.tls
})

async function run () {

  const result= await client.cat.indices()

  console.log(result)
}

run().catch(console.log)