import { AppConfigurationClient, AppConfigurationClientOptions } from "@azure/app-configuration";
import { AzureAppConfiguration } from "./AzureAppConfiguration";
import { AzureAppConfigurationImpl } from "./AzureAppConfigurationImpl";
import { IAzureAppConfigurationOptions } from "./IAzureAppConfigurationOptions";
import { TokenCredential } from "@azure/identity";
import { DEFAULT_SELECTORS, MAX_RETRIES, MAX_RETRY_DELAY_IN_MS, USER_AGENT } from "./constants";
import { UserAgentHeaderPolicy } from "./UserAgentHeaderPolicy";

export async function load(connectionString: string, options?: IAzureAppConfigurationOptions): Promise<AzureAppConfiguration>;
export async function load(endpoint: URL, credential: TokenCredential, options?: IAzureAppConfigurationOptions): Promise<AzureAppConfiguration>;
export async function load(
    conntionStringOrEndpoint: string | URL,
    credentialOrOptions?: TokenCredential | IAzureAppConfigurationOptions,
    appConfigOptions?: IAzureAppConfigurationOptions
): Promise<AzureAppConfiguration> {
    let client: AppConfigurationClient;
    let options: IAzureAppConfigurationOptions | undefined;
    if (typeof conntionStringOrEndpoint === "string") {
        const connectionString = conntionStringOrEndpoint;
        options = credentialOrOptions as IAzureAppConfigurationOptions;
        const clientOptions = getClientOptions(options?.clientOptions);
        client = new AppConfigurationClient(connectionString, clientOptions);
    } else if (conntionStringOrEndpoint instanceof URL && instanceOfTokenCredential(credentialOrOptions)) {
        const endpoint = conntionStringOrEndpoint;
        const credential = credentialOrOptions as TokenCredential;
        options = appConfigOptions;
        const clientOptions = getClientOptions(options?.clientOptions);
        client = new AppConfigurationClient(endpoint.toString(), credential, clientOptions)
    } else {
        throw new Error("A connection string or an endpoint with credential must be specified to create a client.");
    }

    const keyValues: [key: string, value: string][] = [];
    for (const selector of options?.selectors ?? DEFAULT_SELECTORS) {
        const settings = client.listConfigurationSettings({
            keyFilter: selector.keyFilter,
            labelFilter: selector.labelFilter
        });

        for await (const setting of settings) {
            if (setting.key && setting.value) {
                const trimmedKey = keyWithPrefixesTrimmed(setting.key, options?.trimKeyPrefixes);
                keyValues.push([trimmedKey, setting.value]);
            }
        }
    }
    return new AzureAppConfigurationImpl(keyValues);
}

function instanceOfTokenCredential(obj: any) {
    return "getToken" in obj && typeof obj.getToken === "function";
}

function getClientOptions(_customOptions?: object) {
    const defaultClientOptions: AppConfigurationClientOptions = {
        userAgentOptions: { userAgentPrefix: USER_AGENT },
        retryOptions: {
            maxRetries: MAX_RETRIES,
            maxRetryDelayInMs: MAX_RETRY_DELAY_IN_MS,
        },
        additionalPolicies: [
            {
                policy: new UserAgentHeaderPolicy(),
                position: "perCall"
            }
        ]
    }
    // TODO: merge custom options into default client options.
    return defaultClientOptions;
}

function keyWithPrefixesTrimmed(key: string, prefixesToTrim: string[] | undefined): string {
    if (prefixesToTrim) {
        for (const prefix of prefixesToTrim) {
            if (key.startsWith(prefix)) {
                return key.slice(prefix.length);
            }
        }
    }
    return key;
}