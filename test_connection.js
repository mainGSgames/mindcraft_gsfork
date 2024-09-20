import OpenAI from 'openai';
import mineflayer from 'mineflayer';
import settings from './settings.js';

// LM Studio Connection Test
const openai = new OpenAI({
  apiKey: 'lm-studio',
  baseURL: 'http://localhost:1234/v1',
});

async function testLMStudio() {
  try {
    console.log('Testing LM Studio connection...');
    const completion = await openai.chat.completions.create({
      model: 'NousResearch/Hermes-3-Llama-3.1-8B-GGUF',
      messages: [{ role: 'user', content: 'Hello, who are you?' }],
    });
    console.log('LM Studio Response:', completion.choices[0].message.content);
    console.log('LM Studio connection successful!');
  } catch (error) {
    console.error('LM Studio connection failed:', error.message);
  }
}

// Minecraft Connection Test
async function testMinecraftConnection() {
  return new Promise((resolve, reject) => {
    console.log('Testing Minecraft connection...');
    const bot = mineflayer.createBot({
      host: settings.host,
      port: settings.port,
      username: 'TestBot',
      auth: settings.auth,
      version: settings.minecraft_version,
    });

    bot.once('spawn', () => {
      console.log('Minecraft connection successful! Bot spawned.');
      bot.quit();
      resolve();
    });

    bot.on('error', (err) => {
      console.error('Minecraft connection failed:', err.message);
      reject(err);
    });

    // Set a timeout in case the connection hangs
    setTimeout(() => {
      bot.removeAllListeners();
      reject(new Error('Minecraft connection timeout'));
    }, 30000); // 30 seconds timeout
  });
}

// Run both tests
(async () => {
  await testLMStudio();
  console.log('---');
  try {
    await testMinecraftConnection();
  } catch (error) {
    console.error('Minecraft connection test failed:', error.message);
  }
})();