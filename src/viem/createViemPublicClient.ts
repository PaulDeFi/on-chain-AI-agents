import { createPublicClient, http } from 'viem'
import { zksyncSepoliaTestnet } from 'viem/chains'

export function createViemPublicClient() {
    return createPublicClient({
        chain: zksyncSepoliaTestnet,
        transport: http(),
    });
}