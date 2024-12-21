import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Utilisation de la variable d'environnement PORT ou 5000 par défaut
  const port = process.env.PORT || 5000;

  app.enableCors({
    origin: 'http://localhost:3000', // Autorise le frontend
  });

  await app.listen(port, () => {
    console.log(`Application running on http://localhost:${port}`);
  });
}

bootstrap();
