# CloudCourseworkMaster

1. Run "sudo docker-compose build"
1.1 Run "sudo docker-compose up"
1.2 npm install express mongoose amqplib request

2. "console.log(Nodes);" should list all three nodes
3. Leadership election of nodes is dependant on which node has the largest ID number (ie. if the node ID is 1)
   There should be confirmation of the learder node stating it is the leader.
4. Typing "console.log(Nodes);" again should list all three nodes and should identify which is the leader node
5. If a node/container goes down or via the "sudo docker container stop node[X]" or "sudo docker container rm        node[X]"
   command, the system should create a new Container after a minute via the containerUp() function.
6. To identify and view the created container run "sudo docker container ls"
