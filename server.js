//to get path to stylesheet
const path = require("path");
const express = require("express");

//import expression session
const session = require("express-session");

//settingup express handlebars template engine
const exphbs = require("express-handlebars");


//routes files will work as controller
const routes = require("./controllers");

//import sequilize connection
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//import helpers
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up session and connect to our Sequelize db
const sess = {
  secret: "Super secret secret",

  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    // sets httponly attribute to true, meaning the cookie is only accessible through the HTTP protocol
    httpOnly: true,
    // sets secure attribute to false, if secure attribute is true, the cookie is only set when HTTPS is used
    secure: false,
    // sets the sameSite attribute, which controls whether cookies are sent with cross-origin requests
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,

  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create(
  { helpers, runtimeOptions: {
    allowProtoPropertiesByDefault: true },
  }
  );

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

//force true everytime server restarts, it restarts cookies
//false when program is ready
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    )
  );
});
