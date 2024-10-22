const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const UserRoute = require('./routers/userRoutes');
const middleware = require('./middlewares/middleware');

const app = express();
const PORT = 5000;

app.use(middleware);

app.use('/api/users', UserRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
