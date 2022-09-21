const express = require("express");
const app = express();
const PORT = 3001; // default port 8080
var cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs")

const urlDatabase = {
  "b2xVn2": "https://www.lighthouselabs.ca",
  "9sm5xK": "https://www.google.com", 
};
app.post("/urls", (req, res) => {
  console.log(req.body); // Log the POST request body to the console
  res.send("Ok"); // Respond with 'Ok' (we will replace this)
});
app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id]
  const templateVars = {   username: req.cookies["username"],
  urls: urlDatabase};

  res.render("urls_index", templateVars); // Respond with 'Ok' (we will replace this)
});
app.post("/urls/:id", (req, res) => {
   urlDatabase[req.params.id] = req.body.longURL
  // console.log(req.cookies);
  const templateVars = {   username: req.cookies["username"],
  urls: urlDatabase};

  res.render("urls_index", templateVars); // Respond with 'Ok' (we will replace this)
});

app.post("/login", (req, res) => {
 const name = req.body.username
 res.cookie('username', name);
  const templateVars = {  
  username: name,
  urls: urlDatabase};

 res.render("urls_index",templateVars); // Respond with 'Ok' (we will replace this)
});

app.post("/logout", (req, res) => {
  res.clearCookie('username');
  const templateVars = {  
   username: null,
   urls: urlDatabase};
 
  res.render("urls_index",templateVars); // Respond with 'Ok' (we will replace this)
 });

app.get("/", (req, res) => {
  res.send("Hello!");
});
app.get("/urls", (req, res) => {
   
  
  const templateVars = { 
    username: req.cookies["username"] ,
  urls: urlDatabase};
  res.render("urls_index", templateVars);
});

app.get("/register", (req, res) => {
  const templateVars = { 
    username: req.cookies["username"] ,
  urls: urlDatabase};
  res.render("form.ejs", templateVars);
});

app.get("/u/:id", (req, res) => {
 
  const longURL = urlDatabase[req.params.id]
  res.render(longURL);
}); 
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
}); 
app.get("/urls/:id", (req, res) => {
  const templateVars = {  username: req.cookies["username"] , id: req.params.id, longURL: urlDatabase[req.params.id] };
  res.render("urls_show", templateVars);
}); 

// app.get("/urls.json", (req, res) => {
//     res.json(urlDatabase);
//   });
                      

  // app.get("/hello", (req, res) => {
  //   res.send("<html><body>Hello <b>World</b></body></html>\n");
  // });                         
  // app.get("/set", (req, res) => {
  //   const a = 1;
  //   res.send(`a = ${a}`);
  //  });
   
  //  app.get("/fetch", (req, res) => {
  //   res.send(`a = ${a}`);
  //  });
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});



function generateRandomString(){}
