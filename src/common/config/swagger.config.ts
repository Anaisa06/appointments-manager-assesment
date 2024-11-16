import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SwaggerConfig = (app: INestApplication) => {
  const versionApp = '1.0';
  const config = new DocumentBuilder()
    .setTitle('Hospital Appointments Manager')
    .setDescription(`This is an API to manage the appointments of a hospital`)
    .setVersion(versionApp)
    .addServer('/api')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    // .addApiKey(
    //     {
    //       type: 'apiKey',
    //       name: 'x-api-key',
    //       in: 'header'
    //     },
    //     'x-api-key', // Nombre del esquema de seguridad
    //   )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`api/v1/docs`, app, document);
};
