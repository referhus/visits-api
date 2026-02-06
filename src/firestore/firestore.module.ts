import { Global, Module } from '@nestjs/common';
import { FirestoreService } from './firestore.service';
import { FirestoreProvider } from './firestore.providers';

@Global()
@Module({
  providers: [FirestoreProvider, FirestoreService],
  exports: [FirestoreService],
})
export class FirestoreModule {}
