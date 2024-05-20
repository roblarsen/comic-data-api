const { CosmosClient } = require("@azure/cosmos");
const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const client = new CosmosClient({ endpoint, key });

const databaseId = "ComicData";
const containerId = "Comics";
const partitionKey = { kind: "Hash", paths: ["/category"] };

async function createDatabase() {
  const { database } = await client.databases.createIfNotExists({
    id: databaseId,
  });
  console.log(`Database ${database.id} created`);
}

async function createContainer() {
  const { container } = await client
    .database(databaseId)
    .containers.createIfNotExists({
      id: containerId,
      partitionKey,
    });
  console.log(`Container ${container.id} created`);
}

async function addComic(comic) {
  const { item } = await client
    .database(databaseId)
    .container(containerId)
    .items.upsert(comic);
  console.log(`Added item with id: ${item.id}`);
}

async function queryComics(querySpec) {
  const { resources: items } = await client
    .database(databaseId)
    .container(containerId)
    .items.query(querySpec)
    .fetchAll();
  return items;
}

async function replaceComic(id, comic) {
  const { item } = await client
    .database(databaseId)
    .container(containerId)
    .item(id, comic.category)
    .replace(comic);
  console.log(`Replaced item with id: ${item.id}`);
}

async function deleteComic(id, category) {
  await client
    .database(databaseId)
    .container(containerId)
    .item(id, category)
    .delete();
  console.log(`Deleted item with id: ${id}`);
}

module.exports = {
  createDatabase,
  createContainer,
  addComic,
  queryComics,
  replaceComic,
  deleteComic,
};
