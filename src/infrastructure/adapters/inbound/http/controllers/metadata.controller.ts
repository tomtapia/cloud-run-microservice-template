import { env } from 'process';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { gcpMetadata } from 'google-auth-library';

@Controller('metadata')
export class MetadataController {
  @Get()
  async show(@Req() request: Request, @Res() response: Response) {
    const acceptHeader = request.headers.accept;
    const isAvailable = await gcpMetadata.isAvailable();
    const jsonResponse = {
      instance: {},
      project: {},
      environment: env,
    };

    if (isAvailable) {
      jsonResponse.instance = {
        id: await gcpMetadata.instance('id'),
        platformSecurity: await gcpMetadata.instance('platform-security'),
        region: await gcpMetadata.instance('region'),
        serviceAccounts: {
          email: await gcpMetadata.instance('service-accounts/default/email'),
          token: await gcpMetadata.instance('service-accounts/default/token'),
        },
        zone: await gcpMetadata.instance('zone'),
      };
      jsonResponse.project = {
        projectId: await gcpMetadata.project('project-id'),
        numericProjectId: await gcpMetadata.project('numeric-project-id'),
      };
    }

    if (acceptHeader.includes('text/html')) {
      return response.render('metadata', jsonResponse);
    } else {
      return response.status(200).json(jsonResponse);
    }
  }
}
