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
  setDoc,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore/lite';
import { Paging } from 'src/controllers/dto';
import { v4 } from 'uuid';

@Injectable()
export class ProductService {
  constructor(@Inject('FIRESTORE_DB') private readonly firestore: Firestore) {}

  async createProduct(productData: any): Promise<void> {
    const productId = v4();
    const productRef = doc(this.firestore, 'products', productId);
    await setDoc(productRef, productData);
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
    await updateDoc(productRef, updatedData);
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

  async getAllProducts(params: Paging): Promise<any[]> {
    const { page, limit: limitNumber, sort = '-createdAt', keyword } = params;
    const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
    const sortOrder = sort.startsWith('-') ? 'desc' : 'asc';
    const usersCollection = collection(this.firestore, 'products');
    const offset = (page - 1) * limitNumber;
    let productsQuery = query(
      usersCollection,
      orderBy(sortField, sortOrder),
      limit(limitNumber),
    );
    if (keyword) {
      productsQuery = query(
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
      productsQuery = query(
        usersCollection,
        orderBy(sortField, sortOrder),
        startAfter(lastVisible),
        limit(limitNumber),
      );
    }

    const snapshot = await getDocs(productsQuery);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
}
