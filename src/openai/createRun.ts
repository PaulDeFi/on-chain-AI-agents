import OpenAi from "openai";
import { Run } from "openai/resources/beta/threads/runs/runs";
import { Thread } from "openai/resources/beta/threads/threads";
import { RunStatus } from "openai/resources/beta/threads/runs/runs";

export async function createRun(client: OpenAi, thread: Thread, assistantId: string): Promise<Run> {
    let run: Run = await client.beta.threads.runs.create(thread.id, {
        assistant_id: assistantId
    });
    
    // wait for run to complete
    while (run.status == "in_progress" || run.status == "queued") {
        await new Promise(resolve => setTimeout(resolve, 1000)); // wait for 1 second
        run = await client.beta.threads.runs.retrieve(thread.id, run.id);
    }

    return run;
}