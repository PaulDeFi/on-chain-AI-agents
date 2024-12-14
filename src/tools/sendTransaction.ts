import { Address, parseEther } from "viem";
import { createViemWalletClient } from '../viem/createViemWalletClient.js';
import { ToolConfig } from "./allTools.js";

interface SendTransactionArgs {
    to: Address
    value?: string;
}

export const sendTransactionTool: ToolConfig<SendTransactionArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'send_transaction',
            description: 'Send ETH to an address',
            parameters: {
                type: 'object',
                properties: {
                    to: { type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$',
                        description: 'The recipient address'
                        },
                    value: {
                        type: 'string',
                        description: 'The amount of ETH to send (in ETH, not WEI)',
                        optional: true,
                    }
                },
                required: ['to']
            }
        }
    },
    handler: async ({to, value}: SendTransactionArgs) => {
        try {
            const walletClient = createViemWalletClient();

            const hash = await walletClient.sendTransaction({
                to,
                value: value ? parseEther(value) : undefined,
            });

            return hash;
        } catch (error) {
            throw new Error(`Failed to send transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
};