import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import { Duration } from "@aws-cdk/core";
import * as path from "path";
import { HttpApi, HttpMethod } from "@aws-cdk/aws-apigatewayv2";
import { LambdaProxyIntegration } from "@aws-cdk/aws-apigatewayv2-integrations";

export class ServerlessAbehiroshiApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const abeHiroshiApi = new HttpApi(this, "AbeHiroshiApi", {
      apiName: "abe-hiroshi-api",
    });

    ["profile", "movie", "tv", "stage", "photo", "essay"].forEach((api) => {
      abeHiroshiApi.addRoutes({
        path: `/${api}`,
        methods: [HttpMethod.GET],
        integration: new LambdaProxyIntegration({
          handler: new NodejsFunction(this, `${api}ApiFunction`, {
            runtime: lambda.Runtime.NODEJS_14_X,
            memorySize: 128,
            timeout: Duration.seconds(10),
            handler: "handler",
            entry: path.join(__dirname, `/../functions/${api}.ts`),
          }),
        }),
      });
    });
  }
}
