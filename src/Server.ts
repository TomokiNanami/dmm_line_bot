import * as express from 'express';
import router from './router/Router';
import * as bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});