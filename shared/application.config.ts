export default {
  NODE_ENV: process.env.NODE_ENV || 'dev',
  PORT: parseInt(process.env.PORT) || 80,
  CORS_ALLOWED_ORIGINS: ['*'],

  DATABASE: {
    TYPE: 'postgres',
    HOST: process.env.DATABASE_HOST || 'localhost',
    PORT: 5432,
    USERNAME: process.env.DATABASE_USERNAME || 'postgres',
    PASSWORD: process.env.DATABASE_PASSWORD || 'root',
    DATABASE: process.env.DATABASE_NAME || 'postgres',
    ENTITIES: ['dist/**/*.entity.js'],
    SYNCHRONIZE: true,
    LOGGING: true,
    MIGRATIONS: ['dist/migrations/*.js'],
    MIGRATIONS_RUN: false,
    MIGRATIONS_DIR: 'migrations',
    CACHE: {
      ENABLED: false,
      REDIS_HOST: process.env.DB_CACHE_REDIS_HOST || 'localhost',
      REDIS_PORT: parseInt(process.env.DB_CACHE_REDIS_PORT, 10) || 6379,
      IGNORE_ERRORS: true,
    },
  },
};