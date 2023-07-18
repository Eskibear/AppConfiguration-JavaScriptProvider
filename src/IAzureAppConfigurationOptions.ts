import { AppConfigurationClientOptions } from "@azure/app-configuration";

export interface IAzureAppConfigurationOptions {
    selects?: { keyFilter: string, labelFilter: string }[];
    trimKeyPrefixes?: string[];
    clientOptions?: AppConfigurationClientOptions;
    // options for future advanced features, e.g. RefreshOptions, KeyVaultOptions…
}