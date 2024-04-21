import Fastify from 'fastify';
import path from 'path';
import { fileURLToPath } from 'url';
import fastifyStatic from '@fastify/static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env = process.env.NODE_ENV;
console.log(`environment: ${env}`);

const envToLogger = {
    dev: {
        transport: {
            target: 'pino-pretty'
        }
    },
    prod: true,
    test: false
};

const fastify = Fastify({
    logger: envToLogger[env] ?? true
});

fastify.register(fastifyStatic, {
    root: path.join(__dirname, '../dist'),
    prefix: '/' // optional: default '/'
});

fastify.get('/', function (_req, reply) {
    reply.sendFile('index.html'); // serving path.join(__dirname, 'public', 'myHtml.html') directly
});

// Run the server!
fastify.listen({ port: 3204 }, (err, _address) => {
    if (err) throw err;
    // Server is now listening on ${address}
});
