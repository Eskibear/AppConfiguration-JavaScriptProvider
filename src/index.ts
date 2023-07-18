import { AzureAppConfiguration } from "./AzureAppConfiguration";
import { AzureAppConfigurationImpl } from "./AzureAppConfigurationImpl";
import { IAzureAppConfigurationOptions } from "./IAzureAppConfigurationOptions";
import { TokenCredential } from "@azure/identity";


export async function load(connectionString: string, options: IAzureAppConfigurationOptions): Promise<AzureAppConfiguration>;
export async function load(endpoint: URL, credential: TokenCredential, options: IAzureAppConfigurationOptions): Promise<AzureAppConfiguration>;
export async function load(
    conntionStringOrEndpoint: string | URL,
    credentialOrOptions: TokenCredential | IAzureAppConfigurationOptions,
    options?: IAzureAppConfigurationOptions
): Promise<AzureAppConfiguration> {
    // TODO: fetch key-value pairs and return with proper type.
    const kvs = [
        ["a", "1"],
        ["b", "2"]
    ];
    return new AzureAppConfigurationImpl(kvs);
}