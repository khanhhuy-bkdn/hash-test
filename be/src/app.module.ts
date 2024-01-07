import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://<Username>:<Password>@cluster0.cinrkhw.mongodb.net/test'),
    CatsModule,
  ],
})
export class AppModule {}
