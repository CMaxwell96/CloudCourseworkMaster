var request = require('request');

//This is the URL endopint of your vm running docker ??????
var url = 'http://172.16.70.50:2375';




function containerQty(){
    request.get({
        url: url + "/info",
    }, (err, res, data) => {
        if (err) {
            console.log('Error:', err);
        } else if (res.statusCode !== 200) {
	        console.log('Status:', res.statusCode);
        } else{
            data = JSON.parse(data)
            console.log("Number of Containers = " + data.Containers);
        }
    });
}

containerQty();

var create = {
    uri: url + "/v1.40/containers/create",
	method: 'POST',
	json: {"Image": "alpine", "Cmd": ["echo", "Container Deployed"]}
};

request(create, function (error, response, createBody) {
    if (!error) {
	    console.log("Created container " + JSON.stringify(createBody));
     
        var start = {
            uri: url + "/v1.40/containers/" + createBody.Id + "/start",
	      	method: 'POST',
	        json: {}
	    };
		
        request(start, function (error, response, startBody) {
	        if (!error) {
		        console.log("Container startup completed");
	    
                var wait = {
			        uri: url + "/v1.40/containers/" + createBody.Id + "/wait",
                    method: 'POST',
		            json: {}
		        };
		   
                
			    request(wait, function (error, response, waitBody ) {
			        if (!error) {
				        console.log("running wait complete, the container should have started");
			            
                        request.get({
                            url: url + "/v1.40/containers/" + createBody.Id + "/logs?stdout=1",
                            }, (err, res, data) => {
                                    if (err) {
                                        console.log('Error:', err);
                                    } else if (res.statusCode !== 200) {
                                        console.log('Status:', res.statusCode);
                                    } else{
                                       console.log("Container stdout = " + data);
                                        containerQty();
                                    }
                                });
                        }
		        });
            }
        });

    }   
});

