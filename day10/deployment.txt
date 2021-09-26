DEPLOYMENT ON AWS
NOTE

- these steps are followed after you've created ur aws account successfully
- setup a new instance and downloaded the .pem file
- For windows locate the .pem file in C/users
- Now apply these commands in powershell
How to connect to instance after creating it
(Command is present in EC2>Instances>your_instance>Connect to instance>SSH Client)

ssh -i <".pem_file_name"> ubuntu@<ip>.amazonaws.com
Installing nvm in Ubuntu instance
LINK

Installing node v12
nvm install v12
Now create directory and clone/create express project
How to create ??
npx express-generator

How to clone ??
You know right !!
Visit the link to see the express app on web
Link is present in EC2>Instances>your_instance>Connect to instance>SSH Client)

Server is active till we are doing npm start
How to run the server in background
npm install forever -g
How to run the app forever
forever start ./bin/www
How to get the port on which forever is running
forever list
How to quit instance in terminal
exit