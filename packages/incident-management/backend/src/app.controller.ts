import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Incident } from './models/Incident';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/api/incident')
  @HttpCode(HttpStatus.NO_CONTENT)
  async createIncident(@Body() incident: Incident): Promise<void> {
    this.appService.createIncident('some-tenant-id', incident);
  }
}
