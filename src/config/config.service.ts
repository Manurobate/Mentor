import { Inject, Injectable } from '@nestjs/common';
import { EnvConfig } from './interfaces/envconfig.interface';
import * as fs from 'node:fs';
import path from 'node:path';
import * as dotenv from 'dotenv';
import { CONFIG_OPTIONS } from './constantes';
import type { ConfigOptions } from './interfaces/config-options.interface';

@Injectable()
export class ConfigService {
  private envConfig: EnvConfig;

  constructor(@Inject(CONFIG_OPTIONS) options: ConfigOptions) {
    const fileName = `${process.env.NODE_ENV || ''}.env`;
    const filePath = path.resolve(__dirname, '../..', options.folder, fileName);

    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
