import * as cdk from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';
import {Duration} from '@aws-cdk/core';

export class BoonjiashenDotComInfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const topLevelDomainName = 'boonjiashen-dev.com';

    // This zone will include automatically created name servers, which you will need to
    // be provided to the domain registrar, e.g.,
    // https://console.aws.amazon.com/route53/home#DomainDetail:boonjiashen-dev.com
    const zone = new route53.HostedZone(this, 'boonjiashen-dev-dot-com', {
      zoneName: topLevelDomainName,
    });

    // This GitHub repository needs to be associated with `recordName` in the Github Pages tab
    // e.g., https://github.com/boonjiashen2/boonjiashen2.github.io/settings/pages which updates a CNAME file
    // in the repository
    const blogDomainName = 'boonjiashen2.github.io';
    new route53.CnameRecord(this, 'blogRecord', {
      zone: zone,
      domainName: blogDomainName,
      recordName: 'blog.' + zone.zoneName,
      ttl: Duration.seconds(60),
    });
  }
}
