import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
  @Prop()
  onchainId: number;

  @Prop()
  txHash: string;

  @Prop()
  data: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);