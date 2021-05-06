const { CosmosClient } = require("@azure/cosmos");

//const endpoint = "https://sweetshop23456662.documents.azure.com:443/";
//const key = "oggggggMCdfgEGTghhha9HsUKikoghCmadfggmNTuTJBf0I9c3hhhhhhhhghNlPHqFV1w";
const client = new CosmosClient({ endpoint, key });


async function main() {
const { database } = await client.databases.createIfNotExists({ id: "Notflix" });
    console.log(database.id);
    const { container } = await database.containers.createIfNotExists({ id: "Interaction" });
    const items = [
          { id: "1", name: "Caolan", title_ID: "Ozark", date: "06/05/2021 - 21:30", point: "23:03/32:40", type: "Pause" },
          
    ];
    for (const item of items ){
          container.items.create(item);
    }

}


main().catch((error) => {
  console.error(error);
});
