import { PipelinePolicy, PipelineRequest, PipelineResponse, SendRequest } from '@azure/core-rest-pipeline';
import { USER_AGENT } from './constants';

const USER_AGENT_HEADER = "User-Agent";

export class UserAgentHeaderPolicy implements PipelinePolicy {
    name: string = "UserAgentHeaderPolicy";
    sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
        request.headers.set(USER_AGENT_HEADER, USER_AGENT);
        return next(request);
    }
}