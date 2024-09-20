import { AgentProcess } from './src/process/agent-process.js';
import settings from './settings.js';

let profiles = settings.profiles;
let load_memory = settings.load_memory;
let init_message = settings.init_message;

console.log('Starting bot processes...');
console.log('Profiles:', profiles);
console.log('Load memory:', load_memory);
console.log('Init message:', init_message);

for (let profile of profiles) {
    console.log(`Starting agent process for profile: ${profile}`);
    try {
        new AgentProcess().start(profile, load_memory, init_message);
    } catch (error) {
        console.error(`Error starting agent process for profile ${profile}:`, error);
    }
}

console.log('All bot processes started.');