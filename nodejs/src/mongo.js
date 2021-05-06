const mongoose = require('mongoose');

const MongoClient  = require('mongodb');

const express = require('express')

const bodyParser = require('body-parser');

const app = express()
const port = 3000

const connectionString = 'mongodb://localmongo1:27017,localmongo2:27017,localmongo3:27017/sweetShopDB?replicaSet=cfgrs';

var os = require("os");
var myHostName = os.hostname();

var zmq = require("zeromq"),
  sock = zmq.socket("pub");

var url = 'http://192.168.56.111:2375';
var request = require('request');
  

sock.bindSync("tcp://0.0.0.0:3000");
console.log("ZeroMQ h Publisher bound to " + nodes[myhostname].ip + "port 3000");

console.log(myHostName);

var amqp = require('amqplib/callback_api');

var NodeNumber = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
toSend = {"hostName" : myHostName, "message": "Node -> Alive","NodeNumber":NodeNumber} ;
let Nodes = [];

setInterval(function () {

  amqp.connect('amqp://test:test@192.168.56.111', function(error0, connection){
    if (error0) {
            throw error0;
          }
          connection.createChannel(function(error1, channel) {
                  if (error1) {
                            throw error1;
                          }
            var exchange = 'logs';
            var message = JSON.stringify(toSend);
    
                  channel.assertExchange(exchange, 'fanout', {
                            durable: false
                          });
            channel.publish(exchange, '', Buffer.from(message));
            console.log(myHostName, "Message is Sending...");
            });
      });
    }, 10000);
    
amqp.connect('amqp://test:test@192.168.56.7', function(error0, connection) {
      if (error0) {
              throw error0;
            }
      connection.createChannel(function(error1, channel) {
              if (error1) {
                        throw error1;
                      }
              var exchange = 'logs';

              channel.assertExchange(exchange, 'fanout', {
                        durable: false
                      });

              channel.assertQueue('', {
                        exclusive: true
                      }, function(error2, q) {
                                if (error2) {
                                            throw error2;
                                          }
                                console.log(myHostName + " Waiting for Message Response", q.queue);
                                channel.bindQueue(q.queue, exchange, '');

              channel.consume(q.queue, function(msg) {
                         if(msg.content) {
   
                                var MSGstring = msg.content.toString();
                                var MSGparse = JSON.parse(MSGstring);
                        if (MSGparse.hostName != myHostName) {
                        Nodes.some(node => node.hostName === nodeObj.hostName) ? 
                        (Nodes.find(m => m.hostName === MSGparse.hostName)).timestamp = Date.now() : nodes.push({"hostname":MSGparse.hostName,"ID":MSGparse.NodeNumber,"timestamp":Date.now(),"leader":0})
                                              console.log(nodes);
          }
    }}, 
    {
                                            noAck: true
                                          });
                    });
  });
});
            
var nodeLeader = 0;
function nodeLeadershipElection() {
	nodeLeader = 0;
  for (var i = 0; i < Nodes.length; i++) {
  	if(Nodes[i].ID > NodeNumber) {
      nodeLeader = 0;
		break;
	}
	else {
		nodeLeader = 1;
	}
  }
  console.log(myHostName + (nodeLeader ? " I AM the Leader:)":" I am NOT Leader:("));
}
setInterval(nodeLeadershipElection, 15000);

setInterval(function() {
  var date = Date.now();
  for (var i = 0; i < Nodes.length; i++) {
	if(date - Nodes[i].timestamp > 60000) {
		console.log(Nodes[i].hostName + " Node has been down for 1 minute and must restart");
		Nodes.splice(i);
		if (!nodeLeader) {
			leadershipElection();
		}
		if (nodeLeader) {
			console.log("Bring Node back online")
		}
	} else {
		console.log(Nodes[i].hostName + " are currently online");
	}
  }
}, 60000);



app.use(bodyParser.json());


mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

var vidSchema = new Schema({
  Account_ID: Number,
  Username: String,
  Title_ID: Number,
  Interaction_DateTime: String,
  Interaction_Point: String,
  Interaction_Type: String
});

var vidModel = mongoose.model('Video', vidSchema, 'Video');



app.get('/', (req, res) => {
  stockModel.find({}, 'Account_ID UserName Title_ID Interaction_DateTime Interaction_Point Interaction_Type', (err, video) => {
    if (err) return handleError(err);
    res.send(JSON.stringify(video))
  })
})

app.post('/', (req, res) => {
  var awesome_instance = new SomeModel(req.body);
  awesome_instance.save(function (err) {
    if (err) res.send('Error');
    res.send(JSON.stringify(req.body))
  });
})

app.put('/', (req, res) => {
  res.send('PUT request at /')
})

app.delete('/', (req, res) => {
  res.send('DELETE request at /')
})

//bind the express web service to the port specified
app.listen(port, () => {
  console.log(`Express Application listening at port ` + port)
})
