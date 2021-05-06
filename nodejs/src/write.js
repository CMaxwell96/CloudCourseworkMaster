const { CosmosClient } = require("@azure/cosmos");

const endpoint = "https://cloudmaster.mongo.cosmos.azure.com:443/";
const key = "916fe150-72fe-49b8-82e4-cdc64f38b4f9";
const client = new CosmosClient({ endpoint, key });


async function main() {
const { database } = await client.databases.createIfNotExists({ id: "Notflix" });
    console.log(database.id);
    const { container } = await database.containers.createIfNotExists({ id: "Interaction" });
    const items = [
          { id: "1", name: "Caolan", title_ID: "Ozark", date: "06/05/2021 - 21:30", point: "23:03/32:40", type: "Pause" },
          { id: "2", name: "Aila", title_ID: "The Office", date: "01/02/2021 - 16:40", point: "13:40/30:20", type: "Exit" },

    ];
    for (const item of items ){
          container.items.create(item);
    }

}


main().catch((error) => {
  console.error(error);
});
