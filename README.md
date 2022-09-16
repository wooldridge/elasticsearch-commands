# elasticsearch-commands

Execute basic commands on a local Elasticsearch instance.

## Set Up

Edit `config_sample.js` and save as `config.js`.

## Commands

Note that the `bulk` command will load an array of JSON objects in `input/<index-name>.json` into an index `<index-name>` using a mappings JSON object in `input/<index-name>.mappings.json`.

```
node bulk <index-name> 

node delete <index-name> 

node get <index-name> <id>

node indices

node search <index-name> "<query>"
```
