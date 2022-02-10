import {
  createServer,
  Factory,
  Model,
  Response,
} from 'miragejs';
import faker from 'faker';

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name() {
          return faker.name.firstName();
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
    },

    seeds(server) {
      server.createList('user', 100);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users', (schema, request) => {
        const { page = 1, per_page = 10 } =
          request.queryParams;

        const users = schema.all('user');
        const total = users.length;

        const pageStart =
          (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);
        const usersPaginated = users.models.slice(
          pageStart,
          pageEnd
        );

        return new Response(
          200,
          { 'x-total-count': String(total) },
          {
            users: usersPaginated,
          }
        );
      });
      this.get('/users/:id');
      this.post('/users');

      this.namespace = ''; // nao afetar as rotas do nextjs
      this.passthrough(); // se nao for do miragejs, passa pra frente
    },
  });

  return server;
}
