const port = process.env.PORT || 5000;
const app = require('./router');
app.listen(port, () => {
    console.log('Listening on port', port);
});

