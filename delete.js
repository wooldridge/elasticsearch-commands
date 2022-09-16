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

async function run () {

  client.indices.delete({
    index: index,
  }).then(function(resp) {
    console.log(resp);
  }, function(err) {
    console.trace(err.message);
  });

}

run().catch(console.log)