import {
  Stack,
  StackProps,
  Duration,
  aws_lambda as lambda,
  aws_lambda_nodejs as nodejs,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import * as path from "path";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import { HttpApi, HttpMethod } from "@aws-cdk/aws-apigatewayv2-alpha";

export class ServerlessAbehiroshiApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const abeHiroshiApi = new HttpApi(this, "AbeHiroshiApi", {
      apiName: "abe-hiroshi-api",
    });

    ["profile", "movie", "tv", "stage", "photo", "essay"].forEach((api) => {
      const integration = new HttpLambdaIntegration(
        `${api}`,
        new nodejs.NodejsFunction(this, `${api}ApiFunction`, {
          runtime: lambda.Runtime.NODEJS_14_X,
          memorySize: 128,
          timeout: Duration.seconds(10),
          handler: "handler",
          entry: path.join(__dirname, `/../functions/${api}.ts`),
        })
      );

      abeHiroshiApi.addRoutes({
        path: `/${api}`,
        methods: [HttpMethod.GET],
        integration,
      });
    });
  }
}
