import { AppConfigurationClientOptions } from "@azure/app-configuration";

export interface IAzureAppConfigurationOptions {
    selectors?: { keyFilter: string, labelFilter: string }[];
    trimKeyPrefixes?: string[];
    clientOptions?: AppConfigurationClientOptions;
    // options for future advanced features, e.g. RefreshOptions, KeyVaultOptions…
}