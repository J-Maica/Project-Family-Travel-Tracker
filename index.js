import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "your db",
  password: "your password",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId;

let users = [];


async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries JOIN users ON users.id = user_id WHERE user_id = $1", [currentUserId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function getCurrentUser() {
  if (!currentUserId) {
    const result = await db.query("SELECT * FROM users");
    const usersList = result.rows;
    if (usersList.length > 0) {
      currentUserId = usersList[0].id;
    }
    users = usersList;
  }
  return users.find((user) => user.id == currentUserId);
}

async function updateUsersList() {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
}


app.get("/", async (req, res) => {

  const countries = await checkVisisted();
  const currentUser = await getCurrentUser() ;
  // console.log("currentUser", currentUser)
  if(currentUser){
    await updateUsersList()
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: currentUser.color, 
    });
  } else {
    res.render("index.ejs", {
      countries: null,
      total: 0,
      users: users,
      color: null, 
    });
  }
 
});

//Add new visited country
app.post("/add", async (req, res) => {
  const input = req.body["country"];
  const currentUser = await getCurrentUser()
  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      const countries = await checkVisisted()
      const currentUser = await getCurrentUser() ;
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        users: users,
        color:currentUser.color,
        error: "Country has already been added, try again.",
      })
    }
  } catch (err) {
    console.log(err);
    const countries = await checkVisisted()
      const currentUser = await getCurrentUser() ;
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        users: users,
        color:currentUser.color,
        error: "Error occured, kindly check input",
      })
  }
});

//Adding new user
app.post("/user", async (req, res) => {
  if(req.body.add === "new"){
    res.render("new.ejs");
  } else {
    currentUserId = req.body.user;
    res.redirect("/")
  }
});

app.post("/new", async (req, res) => {
  const name = req.body.name;
  const color = req.body.color;

  try {
    const result = await db.query("INSERT INTO users(name, color) VALUES ($1, $2) RETURNING *;", [name, color])
    const id = result.rows[0].id;
    currentUserId = id;
    await updateUsersList()
    res.redirect("/")
  } catch (error) {
    console.log(error)
    console.log(err);
    res.render("new.ejs", {
      error: "Error occurred while adding new user.",
    });
  }


});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
