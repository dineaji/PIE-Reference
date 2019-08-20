# pie-pdm
About the application.

# How to run this app?
First you need to install all node modules to your app folder. For that open the parent folder location in command promopt and excecute the command ``` npm install```

After installing all dependicies, you can run the application by typing command ```node server```

This will start a server, you can access the application in your browser using URL http://localhost:3009

The application requires a .env file that is not stored in the repo. Create one locally in the root of the repo. Below is an example of its contents:

```
PORT=3009
```
The PORT is the port to bring the server up.

```
WRITE_TO_FILE
```
This flag when set to true will force logs to file system.

# Best practices to follow

1. Write code for your later self and for your co-workers in the first place - not for the machine.
2. Use intention-revealing names and don't worry if you have long variable names instead of saving a few keyboard strokes.
3. Your functions should do one thing only on one level of abstraction.
4. Avoid long argument list
5. Use pure functions without side effects, whenever you can. They are really easy to use and test.
6. Higher level functions should be on top and lower levels below. It makes it natural to read the source code.
7. Use promises. No callbacks please
8. Write clean code first and optimize it when you need to. Refer to true impact instead of micro-benchmarks!
9. Use logger for logs avoid console.log
10. Add comments to code to make it meaningful
11. Always use strict
12. Add unit test cases to every function you write using mocha
13. Naming convention for the unit test files
```
<folder>-<folder>-<function js>.test.js example unit test for auth.js that is located in utils/auth.js will be utils-auth.test.js
```
14. Any pattern that is different will have to be added to package.json
15. Use ES6 coding standards
16. The application version and build version should be configured in a config file. It must be properly updated in each release.

Application uses following libraries
```
dotenv --> for loading env variables
activedirectory --> for ldap Authentication
Bluebird --> for promisify
```
