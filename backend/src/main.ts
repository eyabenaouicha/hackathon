import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('/api')  // ay haja fl projet tkoun /api
  const port= process.env.PORT
  await app.listen(port, () => {
    console.log(`Application running on http://localhost:${port}`);
  });

}
bootstrap();
