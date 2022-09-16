const config = require('./config');
const fs = require("fs");

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: config.node,
  auth: config.auth,
  tls: config.tls
})

index = process.argv[2];
if (!index) {
  console.log("Error: Pass index as first argument");
  process.exit();
}

let mappings = fs.readFileSync('./input/' + index + '.mappings.json', 'utf8');
mappings = JSON.parse(mappings);

async function run () {

  await client.indices.create({
    index: index,
    operations: mappings
  }, { ignore: [400] })

  let dataset = fs.readFileSync('./input/' + index + '.json', 'utf8');
  dataset = JSON.parse(dataset);

  if (index === "good-books-ds") {
      // _id in good-books-ds is causing a load error, remove
      dataset = dataset.map(doc => {
        delete doc["_id"];
        return doc;
      })
  }

  const operations = dataset.flatMap(doc => [{ index: { _index: index, _id:  doc.id } }, doc])

  console.log(operations);

  const bulkResponse = await client.bulk({ refresh: true, operations })

  if (bulkResponse.errors) {
    const erroredDocuments = []
    // The items array has the same order of the dataset we just indexed.
    // The presence of the `error` key indicates that the operation
    // that we did for the document has failed.
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0]
      if (action[operation].error) {
        erroredDocuments.push({
          // If the status is 429 it means that you can retry the document,
          // otherwise it's very likely a mapping error, and you should
          // fix the document before to try it again.
          status: action[operation].status,
          error: action[operation].error,
          // operation: body[i * 2],
          // document: body[i * 2 + 1]
        })
      }
    })
    console.log(erroredDocuments)
  }

  const count = await client.count({ index: index })
  console.log(count)
}

run().catch(console.log)