This is the server side for the web application "Foodie Note", a site for users to create and store restaurant informations of their own. The server was built with JavaScript, Node, Express, and uses MongoDB and Mongoose for database storage. The deployed site can be found here: https://young-ravine-24005.herokuapp.com/

This server interacts with a client application I built with JavaScript, HTML5, Bootstrap, and SCSS. The links to the repo and deployed site can be found here: https://github.com/harvey0107/food-note-client

I planned to building working routes and testing curl scripts before getting into the client side. I ran into the problem i guess most people had, it was the need to alter GET route to only return restaurant informations that are owned by the requesting user. In order to do this, I refactored a "requireOwnership" error function to return a boolean value instead of throwing an error.

In future versions of this project, I would like to include the ability to comment on each restaurant, so users able to take note and markdown anything they need after each visit.

ERD: https://imgur.com/tSOVIwK
