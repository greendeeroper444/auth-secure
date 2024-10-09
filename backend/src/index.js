const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const UserRoute = require('./routers/UserRoutes');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', UserRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
