import { Server, Model, Response, Factory } from 'miragejs'

// 4 second delay
const timing = 4000;

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,
    models: {
      task: Model,
      token: Model,
      profile: Model.extend<Partial<IUserProfile>>({}),
    },
    factories: {
      profile: Factory.extend<Partial<IUserProfile>>({
        full_name: 'John Doe',
        email: 'test@company.com',
        is_active: true,
        is_superuser: true,
      })
    },
    seeds(server) {
      server.create('profile');
    },
    routes() {
      this.namespace = "";
      this.urlPrefix = 'http://localhost:8080';

      /*
        Login endpoint
      */
      this.post('/login/access-token', (schema, request) => {
        // Create a dummy token to return--all logins are okay with local testing
        // unless using "fail@test.com" email

        const params = request.params;
        const queryParams = request.queryParams;

        const data = {
          access_token: 'tokenString',
          status: 200,
        };

        console.log('returning', data);

        return data;
      },
      { timing });

      /*
        Profiles endpoint
      */
      this.get('/users/me', (schema, request) => {
        const profile = schema.findBy('profile', { id: '1', });
        console.log('profile', profile);
        return new Response(
          200,
          {},
          {profile},
        );
      },
      { timing });

      /*
        Tasks Endpoint
      */

      // GET /tasks/
      this.get("/tasks", (schema, request) => {
        const allTasks: Task[] = [];
        tasks.forEach((v, k) => {
          allTasks.push({
            ID: v,
            Text: k,
          });
        });
        return allTasks;
      },
      { timing });

      // POST /tasks/
      this.post("/tasks", (schema, request) => {
        let attrs = JSON.parse(request.requestBody).task
        const newId = randomUuid();
        tasks.set(newId, attrs.text);
        return new Response(
          201,
          {},
          { TaskID: newId },
        );
      },
      { timing });

      // GET /tasks/:id
      this.get("/tasks/:id", (schema, request) => {
        let taskId = request.params.id
        
        if (!tasks.has(taskId)) {
          return new Response(
            404,
            {},
            { error: 'No Task found with that ID' },
          );
        } else {
          const task = tasks.get(taskId);
          return new Response(
            200,
            {},
            { Text: task },
          );
        }
      },
      { timing });

      // PUT /tasks/:id
      this.put("/tasks/:id", (schema, request) => {
        let taskId = request.params.id

        let attrs = JSON.parse(request.requestBody)

        if (taskId != attrs.TaskID) {
          return new Response(
            400,
            {},
            { error: 'IDs do not match' },
          );
        }

        const newId = randomUuid();

        tasks.set(newId, attrs.text);

        return new Response(
          204,
        );
      },
      { timing });

      // DELETE /tasks/:id
      this.delete("/tasks/:id", (schema, request) => {
        let taskId = request.params.id

        if (!tasks.has(taskId)) {
          return new Response(
            404,
            {},
            { error: 'Task with ID not found', }
          )
        } else {
          tasks.delete(taskId);
          return new Response(
            204,
          );
        }
      },
      { timing });
    },
  });

  return server;
}

/*
  UUID helper functions
*/

import uuid, { v4 as uuidv4, v4 } from 'uuid';
import { IUserProfile } from './interfaces';

const randomUuid = () => {
  return uuidv4();
}

/*
  REST API functions
*/
interface Task {
  ID: string;
  Text: string;
}
const tasks = new Map();
