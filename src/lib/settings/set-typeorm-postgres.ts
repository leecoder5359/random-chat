import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const setTypeormPostgres = {
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    let obj: TypeOrmModuleOptions = {
      type: 'postgres',
      host: configService.get('postgres.host'),
      port: configService.get('postgres.port'),
      database: configService.get('postgres.database'),
      username: configService.get('postgres.username'),
      password: configService.get('postgres.password'),
      autoLoadEntities: true,
      synchronize: false,
    };

    if (configService.get('STAGE') === 'local') {
      obj = Object.assign(obj, {
        logging: true,
        synchronize: true,
      });
    }

    console.log('obj', obj);
    return obj;
  },
};
