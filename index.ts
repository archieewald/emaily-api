import express from 'express';
const app = express();

const PORT = process.env.PORT;

app.get('/', (_req, res) => {
  res.send({ nobody: 'Hello World!' });
});

app.listen(PORT);

console.log(`App is running at: http://localhost:${PORT}`);
