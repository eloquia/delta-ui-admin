import { Server, Model, Response, Factory } from 'miragejs';

import { IUserProfile } from './interfaces/core';
import { ITaskData } from './interfaces/tasks';

// 4 second delay
const timing = 4000;

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,
    models: {
      task: Model.extend<Partial<ITaskData>>({}),
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

        const data = {
          access_token: 'tokenString',
          status: 200,
        };

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
        return schema.all('task');
      },
      { timing });

      // POST /tasks/
      this.post("/tasks", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        const insertResult = schema.create('task', attrs);
        return insertResult;
      },
      { timing });

      // GET /tasks/:id
      this.get("/tasks/:id", (schema, request) => {
        let taskId = request.params.id

        const searchResult = schema.findBy('task', {id: taskId});
        
        if (searchResult) {
          return searchResult;
        } else {
          return new Response(404, {}, {error: 'Not found'});
        }
      },
      { timing });

    }, // end routes

  }); // end server constructor

  return server;
}
