import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ProposalModule } from './proposals/ProposalModule';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    CqrsModule,
    ProposalModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
    MikroOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
