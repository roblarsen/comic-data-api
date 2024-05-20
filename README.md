# comic-data-api

This project provides a CRUD endpoint for deployment to Azure using Cosmos DB as the back-end. 

## Deployment to Azure

To deploy the CRUD endpoint to Azure, follow these steps:

1. Ensure you have an Azure account and are logged in to the Azure portal.
2. Create a new Cosmos DB account or use an existing one.
3. Deploy the application to Azure App Service using the Azure CLI or through the Azure portal.

## Configuring Cosmos DB

To configure Cosmos DB for use with the CRUD endpoint:

1. Obtain your Cosmos DB connection strings from the Azure portal.
2. Set the connection strings as environment variables in your project.

## Environment Variables

The project utilizes environment variables for Cosmos DB connection strings to ensure secure access. These variables should be defined in `.env` for development and `.env.production.local` for production environments.
