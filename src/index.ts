import OpenAi from "openai";
import "dotenv/config";
import { createAssistant } from "./openai/createAssistant.js";
import { createThread } from "./openai/createThread.js";
import { createRun } from "./openai/createRun.js";
import { performRun } from "./openai/performRun.js";


async function main() {
    const client = new OpenAi()
    const message = "Hello Alt, send 0.001 ETH to 0x9FFC14AB8754E4De3b0C763F58564D60f935Ad6F"

    const assistant = await createAssistant(client);
    const thread = await createThread(client, message);
    const run = await createRun(client, thread, assistant.id);
    const result = await performRun(run, client, thread);

    console.log(result);
}

main();

