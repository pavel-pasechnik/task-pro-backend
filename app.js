import path from 'node:path';

import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import boardRouter from './routes/boardRouter.js';
import feedbackRouter from './routes/feedBack.js';
import usersRouter from './routes/usersRouter.js';
import connect from './server.js';

const PORT = process.env.PORT;
const app = express();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for Task Pro',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from Task Pro.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Task Pro',
      url: 'https://task-pro-omega.vercel.app/',
    },
  },
  servers: [
    {
      url: 'https://task-pro-backend-ehpy.onrender.com/',
      description: 'Web server',
    },
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  tags: [
    {
      name: 'Auth',
      description: 'Routes related to user authentication and authorization.',
    },
    {
      name: 'Users',
      description: 'Routes for managing user profiles and data.',
    },
    {
      name: 'Boards',
      description: 'Routes for creating, updating, and deleting boards.',
    },
    {
      name: 'Columns',
      description: 'Routes for managing board columns.',
    },
    {
      name: 'Cards',
      description: 'Routes for managing cards on boards.',
    },
    {
      name: 'Feedback',
      description: 'Rout for submitting and managing user feedback.',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/avatars', express.static(path.resolve('public', 'avatars')));

app.use('/api/board', boardRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/users', usersRouter);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, _, res, __) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

connect()
  .then(
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    })
  )
  .catch(error => {
    console.log(error);
    process.exit(1);
  });
