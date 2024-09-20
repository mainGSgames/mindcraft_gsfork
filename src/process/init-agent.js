import { Agent } from '../agent/agent.js';
import yargs from 'yargs';

console.log('init-agent.js started');

const args = process.argv.slice(2);
console.log('Arguments received:', args);

const argv = yargs(args)
    .option('profile', {
        alias: 'p',
        type: 'string',
        description: 'Profile filepath to use for agent',
        demandOption: true,
    })
    .option('load_memory', {
        alias: 'l',
        type: 'boolean',
        description: 'Load agent memory from file on startup',
        default: false,
    })
    .option('init_message', {
        alias: 'm',
        type: 'string',
        description: 'Automatically prompt the agent on startup',
        default: null,
    })
    .argv;

console.log('Parsed arguments:', argv);

console.log('Initializing Agent...');
new Agent().start(argv.profile, argv.load_memory, argv.init_message)
    .then(() => console.log('Agent started successfully'))
    .catch(error => console.error('Error starting agent:', error));