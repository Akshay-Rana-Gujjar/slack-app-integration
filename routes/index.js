var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {

  let query = "SELECT * FROM `commands` ORDER BY timestamp DESC";
  db.query(query, (err, result) => {
    if (err) {
        res.status(500).send("error while loading data");
    }

    res.render('index', { data: result});
    
});
});


router.post("/slack", (req, res) => {

  // {"token":"I58TVdP61xFZKnwCK9CYyXot",
  // "team_id":"TGLPDHZEV",
  // "team_domain":"gopal-industries",
  // "channel_id":"CGNCXLW1M",
  // "channel_name":"general",
  // "user_id":"UGMLG2H45",
  // "user_name":"tech",
  // "command":"/usd",
  // "text":"123",
  // "response_url":"https://hooks.slack.com/commands/TGLPDHZEV/594000951238/Y5g8z3aV7cuoutYaA7dDy6fj",
  // "trigger_id":"592532640836.564795611505.2e73ceb85268355f3a24de78c8392b61"}

  const TABLE = "commands";
  const AED_RATE = 3.675;
  let { user_name, user_id, team_id, team_domain, channel_id, channel_name, command, text, response_url } = req.body;
  let timestamp = Date.now();

  let parseUSDAmount = parseFloat(text);

  if(!parseUSDAmount){
    return res.send("Please enter valid amount!!");
  }

  let query = `INSERT INTO ${TABLE} (user_name, user_id, team_id, team_domain, channel_id, channel_name, command, text, response_url, timestamp)
   VALUES ('${user_name}', '${user_id}', '${team_id}', '${team_domain}', '${channel_id}', '${channel_name}', '${command}', '${text}', '${response_url}', '${timestamp}')`;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    let converted_amount = parseFloat(text) * AED_RATE;
    io.sockets.emit("update", { user_name, user_id, team_id, team_domain, channel_id, channel_name, command, text, response_url, timestamp, response : `USD ${parseUSDAmount},   AED ${converted_amount.toFixed(2)}` });
    res.send(`USD ${parseUSDAmount},   AED ${converted_amount.toFixed(2)}`);
  });

});


router.get("/records", (req, res) => {



  console.log("req =>\n", req);

  res.status(200).send({ result: "OK" });
});


module.exports = router;
