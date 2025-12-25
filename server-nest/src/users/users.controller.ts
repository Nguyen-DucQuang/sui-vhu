import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { EventsService } from '../events/events.service';

@Controller('users')
export class UsersController {
  constructor(private adminService: AdminService, private events: EventsService) {}

  @Post('connect')
  async connect(@Body() body: { address: string }) {
    const { address } = body || {};
    const user = await this.adminService.createUserIfNotExists(address);
    // Broadcast to admin clients
    this.events.emit('admin_event', { type: 'user_connected', data: user });
    return { success: true, data: user };
  }
}
