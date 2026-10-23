import 'server-only';
import { MongoClient, type Db } from 'mongodb';

const globalForMongo = globalThis as unknown as {
  _mgsiMongo?: Promise<MongoClient>;
};

function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return Promise.reject(new Error('MONGODB_URI no está definida'));
  }
  if (!globalForMongo._mgsiMongo) {
    const client = new MongoClient(uri, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
    });
    globalForMongo._mgsiMongo = client.connect().catch((error) => {
      // Permite reintentar en la siguiente petición si la conexión falla.
      globalForMongo._mgsiMongo = undefined;
      throw error;
    });
  }
  return globalForMongo._mgsiMongo;
}

export async function getDatabase(): Promise<Db> {
  const client = await getClient();
  return process.env.MONGODB_DB ? client.db(process.env.MONGODB_DB) : client.db();
}
