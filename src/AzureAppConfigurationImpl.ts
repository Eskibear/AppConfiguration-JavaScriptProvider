import { AzureAppConfiguration } from "./AzureAppConfiguration";

export class AzureAppConfigurationImpl extends Map<string, any> implements AzureAppConfiguration {
    constructor(entriesOrIterable: any) {
        super(entriesOrIterable);
    }

    // TODO: how to make it readonly, e.g. disabling below methods after constructing the map.

    // set(key: string, value: any): this {
    //     console.warn("Operation failed. App Configuration is read-only.");
    //     return this;
    // }

    // clear(): void {
    //     console.warn("Operation failed. App Configuration is read-only.");
    // }

    // delete(key: string): boolean {
    //     console.warn("Operation failed. App Configuration is read-only.");
    //     return false;
    // }
}