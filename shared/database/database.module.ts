import { TypeOrmModule } from '@nestjs/typeorm';
import CONFIG from '@application-config';
import { lowercaseKeys } from '@shared/utils/lowercase-keys.util';

const {
  MIGRATIONS_RUN,
  MIGRATIONS_DIR,
  CACHE: {
    ENABLED: isCacheEnabled,
    REDIS_HOST,
    REDIS_PORT,
    IGNORE_ERRORS,
  },
  ...rest
} = CONFIG.DATABASE;

const configuration = {
  ...lowercaseKeys(rest),
  migrationsRun: MIGRATIONS_RUN,
  cli: {
    migrationsDir: MIGRATIONS_DIR,
  },
  cache: {}
};

if (isCacheEnabled) {
  configuration.cache = {
    type: 'redis' as const,
    options: {
      host: REDIS_HOST,
      port: REDIS_PORT
    },
    ignoreErrors: IGNORE_ERRORS,
  }
}

export default TypeOrmModule.forRoot(configuration);
