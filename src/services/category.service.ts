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
import { CreateCategoryDto, Pagination, Paging } from 'src/controllers/dto';
import { v4 } from 'uuid';

@Injectable()
export class CategoryService {
  constructor(@Inject('FIRESTORE_DB') private readonly firestore: Firestore) {}

  async createCategory(categoryData: CreateCategoryDto): Promise<void> {
    const categoryId = v4();
    const categoryRef = doc(this.firestore, 'categories', categoryId);
    const categoryWithTimestamps = {
      ...categoryData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(categoryRef, categoryWithTimestamps);
  }

  async getCategory(categoryId: string): Promise<any> {
    const categoryRef = doc(this.firestore, 'categories', categoryId);
    const categoryDoc = await getDoc(categoryRef);
    if (!categoryDoc.exists()) {
      throw new Error(`Category with ID ${categoryId} not found`);
    }
    return categoryDoc.data();
  }

  async updateCategory(categoryId: string, updatedData: any): Promise<void> {
    const categoryRef = doc(this.firestore, 'categories', categoryId);
    const updateWithTimestamps = {
      ...updatedData,
      updatedAt: serverTimestamp(),
    };
    await updateDoc(categoryRef, updateWithTimestamps);
  }

  async deleteCategory(categoryId: string): Promise<void> {
    const categoryRef = doc(this.firestore, 'categories', categoryId);
    await deleteDoc(categoryRef);
  }

  async deleteCategories(categoryIds: string[]): Promise<void> {
    const deletePromises = categoryIds.map((categoryId) => {
      const categoryRef = doc(this.firestore, 'categories', categoryId);
      return deleteDoc(categoryRef);
    });
    await Promise.all(deletePromises);
  }

  async getAllCategories(params: Paging): Promise<Pagination<any>> {
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
    const usersCollection = collection(this.firestore, 'categories');
    const offset = (page - 1) * limitNumber;
    let totalSnapshot = await getDocs(usersCollection);

    let categoriesQuery = query(
      usersCollection,
      orderBy(sortField, sortOrder),
      limit(limitOffset),
    );
    if (keyword) {
      categoriesQuery = query(
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
      categoriesQuery = query(
        usersCollection,
        orderBy(sortField, sortOrder),
        startAfter(lastVisible),
        limit(limitOffset),
      );
    }
    const snapshot = await getDocs(categoriesQuery);
    return {
      page,
      limit: limitOffset,
      count: totalCount,
      totalPages,
      rows: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    };
  }
}
