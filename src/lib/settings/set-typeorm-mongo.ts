import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const setTypeormMongo = {
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    let obj: TypeOrmModuleOptions = {
      type: 'mongodb',
      host: configService.get('mongodb.host'),
      port: configService.get('mongodb.port'),
      database: configService.get('mongodb.database'),
      username: configService.get('mongodb.username'),
      password: configService.get('mongodb.password'),
      autoLoadEntities: true,
      synchronize: false,
    };

    console.log('obj', obj);

    if (configService.get('STAGE') === 'local') {
      obj = Object.assign(obj, {
        logging: true,
        synchronize: true,
      });
    }
    return obj;
  },
};
