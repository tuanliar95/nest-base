/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Inject, Injectable } from '@nestjs/common';
import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore/lite';
import { Paging } from 'src/controllers/dto';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(@Inject('FIRESTORE_DB') private readonly firestore: Firestore) {}

  async createUser(userData: any): Promise<void> {
    const userId = v4();
    const userRef = doc(this.firestore, 'users', userId);
    const userWithTimestamps = {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(userRef, userWithTimestamps);
  }
  async getUser(userId: string): Promise<any> {
    const userRef = doc(this.firestore, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return userDoc.data();
  }

  async updateUser(userId: string, updatedData: any): Promise<void> {
    const userRef = doc(this.firestore, 'users', userId);
    const updatedDataWithTimestamp = {
      ...updatedData,
      updatedAt: serverTimestamp(),
    };
    await updateDoc(userRef, updatedDataWithTimestamp);
  }

  async deleteUsers(userIds: string[]): Promise<void> {
    const deletePromises = userIds.map((userId) => {
      const userRef = doc(this.firestore, 'users', userId);
      return deleteDoc(userRef);
    });
    await Promise.all(deletePromises);
  }

  async getAllUsers(params: Paging): Promise<any[]> {
    const { page, limit: limitNumber, sort = '-createdAt', keyword } = params;
    const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
    const sortOrder = sort.startsWith('-') ? 'desc' : 'asc';
    const usersCollection = collection(this.firestore, 'users');
    const offset = (page - 1) * limitNumber;
    let usersQuery = query(
      usersCollection,
      orderBy(sortField, sortOrder),
      limit(limitNumber),
    );
    if (keyword) {
      usersQuery = query(
        usersCollection,
        where('name', '>=', keyword),
        where('name', '<=', keyword + '\uf8ff'),
        orderBy(sortField, sortOrder),
        limit(limitNumber),
      );
    }
    if (offset > 0) {
      const snapshot = await getDocs(
        query(usersCollection, orderBy(sortField, sortOrder), limit(offset)),
      );
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      usersQuery = query(
        usersCollection,
        orderBy(sortField, sortOrder),
        startAfter(lastVisible),
        limit(limitNumber),
      );
    }

    const snapshot = await getDocs(usersQuery);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
}
