import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigOptions } from './interfaces/config-options.interface';
import { CONFIG_OPTIONS } from './constantes';

@Global()
@Module({})
export class ConfigModule {
  static forRoot(options: ConfigOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        ConfigService,
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
      ],
      exports: [ConfigService],
    };
  }
}
