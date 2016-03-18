Just a personal attempt to replicate an Instragram like open source social network.

# Usage
You should have a node interpeter and mongodb installed on your system in order to test this project with the following steps:
* `git clone https://github.com/marioguerriero/social-network`
* `cd social-network`
* `npm install`
* Now use `npm start` or `NODE_ENV=development node src/index.js` to run
* You will see a message like `Server listening on port PORT`
* Now perform an HTTP GET request to http://localhost:PORT to use it

I still did not understand why we need `NODE_ENV=development`. It is quite poorly documented but I experienced it is necessary if I want real server side rendering.

# Used technologies
* [Node.js](https://nodejs.org/)
* [Express](expressjs.com/)
* [React](https://facebook.github.io/react/)
* [MongoDB](https://www.mongodb.org/)
* [Handlebars](http://handlebarsjs.com/)

And much more...

# TODO
* [x] REST API with Node.js and Express
* [x] Send a cookie after authentication
* [x] Server side view rendering with React
* [ ] Write an Express middleware which add an user object to the request one
* [ ] Write an Express middleware to automatically browserify/reactify Javascript files
