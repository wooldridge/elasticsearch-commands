const config = require('./config');

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: config.node,
  auth: config.auth,
  tls: config.tls
})

index = process.argv[2];
q = process.argv[3];
depth = process.argv[4];
if (!index || !q) {
  console.log("Error: Pass index as first argument, quoted query as second argument");
  process.exit();
}

async function run () {

  const result= await client.search({
    index: index,
    size: 10,
    "query": { "query_string": { "query": q } }
  });

  console.dir(result.hits.hits, {depth: depth || 2});
}

run().catch(console.log)