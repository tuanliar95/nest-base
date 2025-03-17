/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
import { Pagination, Paging } from 'src/controllers/dto';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(@Inject('FIRESTORE_DB') private readonly firestore: Firestore) {}

  async createUser(userData: any): Promise<void> {
    const userId = v4();
    const userRef = doc(this.firestore, 'users', userId);
    const userWithTimestamps = {
      ...userData,
      roles: userData.roles?.length ? userData.roles : ['user'],
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
    return {
      id: userDoc.id,
      ...userDoc.data(),
      roles: userDoc.data()?.roles?.length ? userDoc.data()?.roles : ['user'],
    };
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

  async getAllUsers(params: Paging): Promise<Pagination<any>> {
    const {
      page: current,
      limit: limitNumber,
      sort = '-createdAt',
      keyword,
    } = params;
    const page = Number(current);
    const limitOffset = Number(limitNumber);
    const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
    const sortOrder = sort.startsWith('-') ? 'desc' : 'asc';
    const usersCollection = collection(this.firestore, 'users');
    const offset = (page - 1) * limitOffset;
    let totalSnapshot = await getDocs(usersCollection);
    let usersQuery = query(
      usersCollection,
      orderBy(sortField, sortOrder),
      limit(limitOffset),
    );
    if (keyword) {
      usersQuery = query(
        usersCollection,
        where('name', '>=', keyword),
        where('name', '<=', keyword + '\uf8ff'),
        orderBy(sortField, sortOrder),
        limit(limitOffset),
      );
      totalSnapshot = await getDocs(
        query(
          usersCollection,
          where('name', '>=', keyword),
          where('name', '<=', keyword + '\uf8ff'),
          orderBy(sortField, sortOrder),
        ),
      );
    }

    const totalCount = totalSnapshot.size;
    const totalPages = Math.ceil(totalCount / limitOffset);

    if (offset > 0) {
      const snapshot = await getDocs(
        query(usersCollection, orderBy(sortField, sortOrder), limit(offset)),
      );
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      usersQuery = query(
        usersCollection,
        orderBy(sortField, sortOrder),
        startAfter(lastVisible),
        limit(limitOffset),
      );
    }

    const snapshot = await getDocs(usersQuery);
    return {
      page,
      limit: limitOffset,
      count: totalCount,
      totalPages,
      rows: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    };
  }
  async findOne(email: string, fallBack: boolean = false): Promise<any> {
    const userRef = collection(this.firestore, 'users');
    const userQuery = query(userRef, where('email', '==', email));

    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      if (fallBack) return null;
      else throw new Error(`User with email ${email} not found`);
    }

    const userDoc = userSnapshot.docs[0];
    return {
      id: userDoc.id,
      ...userDoc.data(),
      roles: userDoc.data()?.roles?.length ? userDoc.data()?.roles : ['user'],
    };
  }

  async validateUser(email: string, password: string): Promise<any | null> {
    const user = await this.findOne(email);
    const userPassword: string = user?.password || '123456aA@';
    if (user && password === userPassword) {
      return user;
    }
    return null;
  }
}
