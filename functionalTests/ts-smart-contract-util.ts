/*
* This file contains functions for the use of your test file.
* It doesn't require any changes for immediate use.
*/

import * as fabricNetwork from 'fabric-network';
import * as fs from 'fs-extra';
import * as yaml from 'js-yaml';
import { URL } from 'url';

import * as os from 'os';
import * as path from 'path';

export class SmartContractUtil {

    public static async getConnectionProfile() {
        const homedir = os.homedir();
        const connectionProfilePath: string = path.join(homedir, '.fabric-vscode', 'v2', 'environments', '1 Org Local Fabric', 'gateways', 'Org1 Gateway.json');

        const connectionProfileContents: any = await fs.readFile(connectionProfilePath, 'utf8');
        if (connectionProfilePath.endsWith('.json')) {
            return JSON.parse(connectionProfileContents);
        } else if (connectionProfilePath.endsWith('.yaml') || connectionProfilePath.endsWith('.yml')) {
            return yaml.safeLoad(connectionProfileContents);
        }
    }

    public static async submitTransaction(contractName: string, functionName: string, args: string[], gateway, transient?: fabricNetwork.TransientMap): Promise<Buffer> {
        // Submit transaction
        const network: fabricNetwork.Network = await gateway.getNetwork('mychannel');
        let contract: fabricNetwork.Contract;
        if (contractName !== '') {
            contract = await network.getContract('IBM-Blockchain-Foundation-Developer', contractName);
        } else {
            contract = await network.getContract('IBM-Blockchain-Foundation-Developer');
        }

        const transaction: fabricNetwork.Transaction = contract.createTransaction(functionName);
        if (transient) {
            transaction.setTransient(transient);
        }

        const responseBuffer: Buffer = await transaction.submit(...args);
        return responseBuffer;
    }

    public static async evaluateTransaction(contractName: string, functionName: string, args: string[], gateway, transient?: fabricNetwork.TransientMap): Promise<Buffer> {
        // Evaluate transaction
        const network: fabricNetwork.Network = await gateway.getNetwork('mychannel');
        let contract: fabricNetwork.Contract;
        if (contractName !== '') {
            contract = await network.getContract('IBM-Blockchain-Foundation-Developer', contractName);
        } else {
            contract = await network.getContract('IBM-Blockchain-Foundation-Developer');
        }

        const transaction: fabricNetwork.Transaction = contract.createTransaction(functionName);
        if (transient) {
            transaction.setTransient(transient);
        }

        const responseBuffer: Buffer = await transaction.evaluate(...args);
        return responseBuffer;
    }

    // Checks if URL is localhost
    public static isLocalhostURL(url: string): boolean {
        const parsedURL: URL = new URL(url);
        const localhosts: string[] = [
            'localhost',
            '127.0.0.1',
        ];
        return localhosts.indexOf(parsedURL.hostname) !== -1;
    }

    // Used for determining whether to use discovery
    public static hasLocalhostURLs(profile: any): boolean {
        const urls: string[] = [];
        for (const nodeType of ['orderers', 'peers', 'certificateAuthorities']) {
            if (!profile[nodeType]) {
                continue;
            }
            const nodes: any = profile[nodeType];
            for (const nodeName in nodes) {
                if (!nodes[nodeName].url) {
                    continue;
                }
                urls.push(nodes[nodeName].url);
            }
        }
        return urls.some((url: string) => this.isLocalhostURL(url));
    }
}
