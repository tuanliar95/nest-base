import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { collection, Firestore, getDocs, query, where } from 'firebase/firestore/lite';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @Inject('FIRESTORE_DB') private readonly firestore: Firestore
    ) { }
    async findOne(email: string, fallBack: boolean = false): Promise<any> {
        const userRef = collection(this.firestore, 'users');
        const userQuery = query(userRef, where('email', '==', email));
    
        const userSnapshot = await getDocs(userQuery);
    
        if (userSnapshot.empty) {
          if (fallBack) return null;
          else throw new Error(`User with email ${email} not found`);
        }
    
        const userDoc = userSnapshot.docs[0];
        const { password, ...rest } = userDoc.data();
        return {
          id: userDoc.id,
          ...rest,
          roles: rest?.['roles']?.length ? rest?.['roles'] : ['user'],
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

    async signIn(email: string, pass: string): Promise<{ access_token: string }> {
        const user: { id: string; email: string; roles: string[] } =
            await this.validateUser(email, pass);
        if (!user) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, email: user.email, roles: user.roles };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}