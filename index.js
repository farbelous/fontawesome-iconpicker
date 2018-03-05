const express = require('express');
const app = express();

app.set('port', 2828);
app.use(express.static(__dirname));

app.listen(app.get('port'), function () {
	console.log("App1 is running at localhost:" + app.get('port'));
})