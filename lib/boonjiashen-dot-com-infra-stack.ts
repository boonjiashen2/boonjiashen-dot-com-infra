import * as cdk from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';
import { Duration } from '@aws-cdk/core';

export class BoonjiashenDotComInfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const zone = new route53.HostedZone(this, "boonjiashen-dev-dot-com", {
      zoneName: "boonjiashen-dev.com",
    });

    const blogRecord = new route53.CnameRecord(this, "blogRecord", {
      zone: zone,
      domainName: "boonjiashen.github.io",
      recordName: "blog." + zone.zoneName,
      ttl: Duration.seconds(60),
    })
  }
}
