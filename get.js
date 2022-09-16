const config = require('./config');

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: config.node,
  auth: config.auth,
  tls: config.tls
})

index = process.argv[2];
id = process.argv[3];
if (!index || !id) {
  console.log("Error: Pass index as first argument, id as second argument");
  process.exit();
}

async function run () {

  const document = await client.get({
    index: index,
    id: id
  })

  console.log(document)
}

run().catch(console.log)