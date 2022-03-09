/*
* Use this file for functional testing of your smart contract.
* Fill out the arguments and return values for a function and
* use the CodeLens links above the transaction blocks to
* invoke/submit transactions.
* All transactions defined in your smart contract are used here
* to generate tests, including those functions that would
* normally only be used on instantiate and upgrade operations.
* This basic test file can also be used as the basis for building
* further functional tests to run as part of a continuous
* integration pipeline, or for debugging locally deployed smart
* contracts by invoking/submitting individual transactions.
*/
/*
* Generating this test file will also trigger an npm install
* in the smart contract project directory. This installs any
* package dependencies, including fabric-network, which are
* required for this test file to be run locally.
*/

import * as assert from 'assert';
import * as fabricNetwork from 'fabric-network';
import { SmartContractUtil } from './ts-smart-contract-util';

import * as os from 'os';
import * as path from 'path';

describe('MyAssetContract-IBM-Blockchain-Foundation-Developer@0.0.2' , () => {

    const homedir: string = os.homedir();
    const walletPath: string = path.join(homedir, '.fabric-vscode', 'v2', 'environments', '1 Org Local Fabric', 'wallets', 'Org1');
    const gateway: fabricNetwork.Gateway = new fabricNetwork.Gateway();
    let fabricWallet: fabricNetwork.Wallet;
    const identityName: string = 'Org1 Admin';
    let connectionProfile: any;

    before(async () => {
        connectionProfile = await SmartContractUtil.getConnectionProfile();
        fabricWallet = await fabricNetwork.Wallets.newFileSystemWallet(walletPath);
    });

    beforeEach(async () => {
        const discoveryAsLocalhost: boolean = SmartContractUtil.hasLocalhostURLs(connectionProfile);
        const discoveryEnabled: boolean = true;

        const options: fabricNetwork.GatewayOptions = {
            discovery: {
                asLocalhost: discoveryAsLocalhost,
                enabled: discoveryEnabled,
            },
            identity: identityName,
            wallet: fabricWallet,
        };

        await gateway.connect(connectionProfile, options);
    });

    afterEach(async () => {
        gateway.disconnect();
    });

    describe('myAssetExists', () => {
        it('should evaluate myAssetExists transaction', async () => {
            // TODO: populate transaction parameters
            const myAssetId: string = '002';
            const args: string[] = [ myAssetId];
            // TODO: populate or delete transientData as appropriate
            const transientData: fabricNetwork.TransientMap = {};
            const response: Buffer = await SmartContractUtil.evaluateTransaction('MyAssetContract', 'myAssetExists', args, gateway, transientData);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.strictEqual(JSON.parse(response.toString()), true);
            // assert.strictEqual(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('createMyAsset', () => {
        it('should submit createMyAsset transaction', async () => {
            // TODO: populate transaction parameters
            const myAssetId: string = 'EXAMPLE';
            const value: string = 'EXAMPLE';
            const args: string[] = [ myAssetId, value];
            // TODO: populate or delete transientData as appropriate
            const transientData: fabricNetwork.TransientMap = {};
            const response: Buffer = await SmartContractUtil.submitTransaction('MyAssetContract', 'createMyAsset', args, gateway, transientData);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.strictEqual(true, true);
            // assert.strictEqual(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('readMyAsset', () => {
        it('should evaluate readMyAsset transaction', async () => {
            // TODO: populate transaction parameters
            const myAssetId: string = 'EXAMPLE';
            const args: string[] = [ myAssetId];
            // TODO: populate or delete transientData as appropriate
            const transientData: fabricNetwork.TransientMap = {};
            const response: Buffer = await SmartContractUtil.evaluateTransaction('MyAssetContract', 'readMyAsset', args, gateway, transientData);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.strictEqual(true, true);
            // assert.strictEqual(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('updateMyAsset', () => {
        it('should submit updateMyAsset transaction', async () => {
            // TODO: populate transaction parameters
            const myAssetId: string = 'EXAMPLE';
            const newValue: string = 'EXAMPLE';
            const args: string[] = [ myAssetId, newValue];
            // TODO: populate or delete transientData as appropriate
            const transientData: fabricNetwork.TransientMap = {};
            const response: Buffer = await SmartContractUtil.submitTransaction('MyAssetContract', 'updateMyAsset', args, gateway, transientData);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.strictEqual(true, true);
            // assert.strictEqual(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('deleteMyAsset', () => {
        it('should submit deleteMyAsset transaction', async () => {
            // TODO: populate transaction parameters
            const myAssetId: string = 'EXAMPLE';
            const args: string[] = [ myAssetId];
            // TODO: populate or delete transientData as appropriate
            const transientData: fabricNetwork.TransientMap = {};
            const response: Buffer = await SmartContractUtil.submitTransaction('MyAssetContract', 'deleteMyAsset', args, gateway, transientData);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.strictEqual(true, true);
            // assert.strictEqual(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

});
