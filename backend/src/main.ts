import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors({
		origin: ['http://localhost:4000'], // Liste des origines autorisées
		methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
		allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
		credentials: true, // Autoriser les cookies et les en-têtes d'autorisation
		preflightContinue: false, // Désactiver la réponse anticipée aux requêtes OPTIONS
		optionsSuccessStatus: 200, // Statut HTTP à renvoyer pour les requêtes OPTIONS réussies
		maxAge: 3600, // Durée en secondes pendant laquelle le navigateur peut mettre en cache les résultats de la pré-vérification CORS
	});
	await app.listen(3000);
}
bootstrap();
