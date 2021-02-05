import { Server, Model, Response, Factory, Registry } from 'miragejs';
import { FactoryDefinition, ModelDefinition } from 'miragejs/-types';

import { IUserProfile } from './interfaces/core';
import { ITaskData } from './interfaces/tasks';

// 4 second delay
const timing = 4000;

export function makeServer({ environment = 'development' } = {}):  Server<Registry<Record<string, ModelDefinition<Record<string, unknown>>>, Record<string, FactoryDefinition<Record<string, unknown>>>>> {
	const server = new Server({
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
			this.namespace = '';
			this.urlPrefix = 'http://localhost:8080';

			/*
        Login endpoint
      */
			this.post('/login/access-token', () => {
				// Create a dummy token to return--all logins are okay with local testing
				// unless using "fail@test.com" email

				const data = {
					access_token: 'tokenString',
				};

				return data;
			},
			{ timing });

			/*
        Profiles endpoint
      */
			this.get('/users/me', (schema) => {
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
			this.get('/tasks', (schema) => {
				return schema.all('task');
			},
			{ timing });

			// POST /tasks/
			this.post('/tasks', (schema, request) => {
				const attrs = JSON.parse(request.requestBody);
				const insertResult = schema.create('task', attrs);
				return insertResult;
			},
			{ timing });

			// GET /tasks/:id
			this.get('/tasks/:id', (schema, request) => {
				const taskId = request.params.id;

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
