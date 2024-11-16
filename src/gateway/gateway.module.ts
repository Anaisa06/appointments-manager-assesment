import { forwardRef, Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { AppointmentsModule } from 'src/appointments/appointments.module';

@Module({
  imports: [
    forwardRef(() => AppointmentsModule)
  ],
  providers: [SocketService],
  exports: [SocketService]
})
export class GatewayModule {}
