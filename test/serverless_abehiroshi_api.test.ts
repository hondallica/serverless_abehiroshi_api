import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as ServerlessAbehiroshiApi from '../lib/serverless_abehiroshi_api-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new ServerlessAbehiroshiApi.ServerlessAbehiroshiApiStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
