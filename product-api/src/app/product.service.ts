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
import { v4 } from 'uuid';
import { CreateProductDto } from './dtos';
import { Pagination, Paging } from '@shared/dtos';


@Injectable()
export class ProductService {
  constructor(@Inject('FIRESTORE_DB') private readonly firestore: Firestore) {}

  async createProduct(productData: CreateProductDto): Promise<void> {
    const categoryRef = doc(
      this.firestore,
      'categories',
      productData.categoryId,
    );
    const categoryDoc = await getDoc(categoryRef);
    if (!categoryDoc.exists()) {
      throw new Error(`Category with ID ${productData.categoryId} not found`);
    }
    const productId = v4();
    const productRef = doc(this.firestore, 'products', productId);
    const productWithTimestamps = {
      ...productData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(productRef, productWithTimestamps);
  }

  async getProduct(productId: string): Promise<any> {
    const productRef = doc(this.firestore, 'products', productId);
    const productDoc = await getDoc(productRef);
    if (!productDoc.exists()) {
      throw new Error(`Product with ID ${productId} not found`);
    }
    return productDoc.data();
  }

  async updateProduct(productId: string, updatedData: any): Promise<void> {
    const productRef = doc(this.firestore, 'products', productId);
    const updateWithTimestamps = {
      ...updatedData,
      updatedAt: serverTimestamp(),
    };
    await updateDoc(productRef, updateWithTimestamps);
  }

  async deleteProduct(productId: string): Promise<void> {
    const productRef = doc(this.firestore, 'products', productId);
    await deleteDoc(productRef);
  }

  async deleteProducts(productIds: string[]): Promise<void> {
    const deletePromises = productIds.map((productId) => {
      const productRef = doc(this.firestore, 'products', productId);
      return deleteDoc(productRef);
    });
    await Promise.all(deletePromises);
  }

  async getAllProducts(params: Paging): Promise<Pagination<any>> {
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
    const usersCollection = collection(this.firestore, 'products');
    const offset = (page - 1) * limitNumber;
    let totalSnapshot = await getDocs(usersCollection);
    let productsQuery = query(
      usersCollection,
      orderBy(sortField, sortOrder),
      limit(limitOffset),
    );
    if (keyword) {
      productsQuery = query(
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
      productsQuery = query(
        usersCollection,
        orderBy(sortField, sortOrder),
        startAfter(lastVisible),
        limit(limitOffset),
      );
    }

    const snapshot = await getDocs(productsQuery);
    return {
      page,
      limit: limitOffset,
      count: totalCount,
      totalPages,
      rows: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    };
  }
}
