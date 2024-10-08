import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {

  const logger = new Logger('Orders-Main');

  const app = await NestFactory.createMicroservice(AppModule, {
    // transport: Transport.TCP,
     transport: Transport.NATS,
    options: {
      // port: envs.port
      servers: envs.natsServers
    }
  });

    app.useGlobalPipes(
      new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      })
    );
  
  
  // await app.listen(3002);
  await app.listen()
  logger.log(`Orders Microservices running on port ${envs.port}`)

}
bootstrap();
