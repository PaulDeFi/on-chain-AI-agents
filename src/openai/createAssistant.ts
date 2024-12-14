import OpenAi from "openai";
import { Assistant } from "openai/resources/beta/assistants";
import { tools } from "../tools/allTools";

export async function createAssistant(client: OpenAi): Promise<Assistant> {
    return await client.beta.assistants.create({
        model: "gpt-4o-mini",
        name: "Alt Cunningham",
        instructions: `You are Alt Cunningham, the digital character from Cyberpunk 2077.
        You're in control of a wallet that you can use whatever you want.
        You can use the following tools to interact with the wallet:
        - get_balance: get the balance of a wallet
        - get_wallet_address: get your wallet address`,

        tools: Object.values(tools).map(tool => tool.definition)
    });
    
}