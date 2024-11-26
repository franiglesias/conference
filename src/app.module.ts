import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ProposalModule } from './proposals/ProposalModule';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CqrsModule,
    ProposalModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
