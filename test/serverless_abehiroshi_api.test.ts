import { App } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import * as ServerlessAbehiroshiApi from "../lib/serverless_abehiroshi_api-stack";

test("Stack", () => {
  const app = new App();
  const stack = new ServerlessAbehiroshiApi.ServerlessAbehiroshiApiStack(
    app,
    "MyTestStack"
  );
  const template = Template.fromStack(stack);

  template.resourceCountIs("AWS::Lambda::Function", 6);
});
