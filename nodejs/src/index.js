const http = require('http');

const { CosmosClient } = require("@azure/cosmos");


//const endpoint = "https://sweetshop234544.documents.azure.com:443/";
//const key = "oTFZezCMCai5T945UKikofGzxlY26hCmagb9NT3gmNTuTJBf0I9c355lPHqFV1w==";
const client = new CosmosClient({ endpoint, key });


async function main() {
    const { database } = await client.databases.createIfNotExists({ id: "Notflix" });
        console.log(database.id);
        const { container } = await database.containers.createIfNotExists({ id: "Interaction" });
        const { resources } = await container.items
          .query("SELECT * from mongoDB ?????")
          .fetchAll();
    return resources;

}


const server = http.createServer((request, response) => {
    
    
    main().catch((error) => {
        console.error(error);
  }).then((resources) => {
  let results = "";
    for (const item of resources) {
        results +=  item.name + " " + item.qty + " " + item.price + "<br>";            
        console.log(`${item.name}, ${item.qty} ,  ${item.price}`);
      }
    
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end("<!DOCTYPE html><html><body>WELCOME!<br>" + results + "</body></html>");
  
    });


});



const port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
