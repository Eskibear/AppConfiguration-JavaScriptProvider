import { AzureAppConfiguration } from "./AzureAppConfiguration";

export class AzureAppConfigurationImpl extends Map<string, any> implements AzureAppConfiguration {
    constructor(entriesOrIterable: any) {
        super(entriesOrIterable);
    }
}