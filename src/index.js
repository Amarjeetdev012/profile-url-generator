import express from 'express';
import router from './router/route.router.js';
import { connectDatabase } from './middleware/mongoose.middleware.js';

const app = express();
app.use(express.json());
app.use('/', router);
const PORT = 3000;
connectDatabase();

// * error handling 1
// app.all('*', function (req, res) {
//   res.status(404).send('page not found');
// });

// *error handling 2
app.use((req, res) => {
  res.status(404).json({
    status: false,
    msg: 'Page not found',
  });
});

app.listen(PORT, () => {
  console.log(`app is running in PORT ${PORT}`);
});
