var app = require('express')();
var express = require('express');
var session = require('express-session');
var request = require('request');


app.set("view engine", "ejs");
app.set("views", "./views")

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


const {
    v4: uuidv4
} = require('uuid');

app.get("/login", (req, res) => {
    res.render('login');
});

app.get("/home", (req, res) => {
    res.render('home');
});


app.get("/transfer", (req, res) => {
    res.render('transfer');
});

app.get("/finalpage", (req, res) => {
    res.render('finalpage');
});



app.get("/initCall", async (req, res) => {
    var options = {
        'method': 'POST',
        'url': `https://api-4ff4f23f.eu.v2.we-stats.com/api/v6/score?action=init&customerId=dummy&customerSessionId=${req.query.customerSessionId}&uuid=${req.query.uuid}`,
        'headers': {}
    };
    request(options, function(error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
          res.send(response.body)

    });
});


app.get("/getScore", async (req, res) => {
var options = {
  'method': 'POST',
  'url': `https://api-4ff4f23f.eu.v2.we-stats.com/api/v6/score?action=getScore&customerId=dummy&customerSessionId=${req.query.customerSessionId}&uuid=${req.query.uuid}`,
  'headers': {
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
  console.log(req.query.customerSessionId);
  console.log(req.query.uuid);
  res.send(response.body)
});
});

/*
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.get('/', (req, res, next) => {
	if (req.session.viewCount) {
		req.session.viewCount = req.session.viewCount + 1;
	} else {
		req.session.viewCount = 1
	}
	console.log(req.session.viewCount) 
	res.sendFile(__dirname+'/index.html');
})
*/
app.listen('4000');