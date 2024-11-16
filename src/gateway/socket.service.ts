import { forwardRef, Inject, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@WebSocketGateway({
    namespace: 'appointments',
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization']
      },
})
export class SocketService implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        @Inject(forwardRef(() => AppointmentsService)) private appointmentService: AppointmentsService
    ){}

    private logger: Logger = new Logger(SocketService.name)

    @WebSocketServer()
    server: Server;

    afterInit(server: any) {
        this.logger.log('Init gateway')
    }

    handleConnection(client: Socket) {
        this.logger.log(`Cliente connected with id ${client.id}`)
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Cliente disconnected with id ${client.id}`)
    }

    @SubscribeMessage('getAppointments')
    async handleGetAppointments(
        @MessageBody() data: any,
        @ConnectedSocket() client: Socket
    ) {

        const appointments = await this.appointmentService.getFutureAppointments();

        this.server.emit(
            'Appointments', appointments
        )
    }

    async handleCancelledAppointments(cancelledAppointment: Appointment) {
        this.server.emit(
            'CancelledAppointments', 'Nueva cita cancelada', cancelledAppointment
        )
    }

    async handleAddAppointment(newAppointment: Appointment) {

        this.server.emit('NewAppointments', 'Nueva cita', newAppointment)
    }

    async handleUpdateAppointment(updatedAppointment: Appointment) {
        this.server.emit('UpdatedAppointments', 'Cita modificada', updatedAppointment)
    }
}
