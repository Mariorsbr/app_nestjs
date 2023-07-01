import { Injectable, HttpException } from '@nestjs/common';
import { USERS } from 'src/mocks/user.mock';
import { User, PrismaClient } from '@prisma/client'; 
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
    ){}

    async addUser(user: User): Promise<User> {
        return this.userRepository.create(user);
    }
    async getAllUsers(): Promise<User []> {
        return await this.userRepository.find();
    }
    async getUserById(userID): Promise<User> {
         return await this.userRepository.findBy(userID);
    }
    async updateUser(user: User): Promise<User> {
        return await this.userRepository.update(user.id, user);
    }
    async deleteUser(id) {
        return await this.userRepository.delete(id);
    }


    // Mock Methods
    users = USERS

    getAllMockUsers(): Promise<any>{
        return new Promise(resolve => {
            resolve(this.users);
        });
    }
    getMockUser(userID): Promise<any> {
        let id = Number(userID);
        return new Promise(resolve => {
            const user = this.users.find(user => user.id === id);
            if (!user) {
                throw new HttpException('Book does not exist!', 404);
            }
            resolve(user);
        });
    }

    addMockUser(user): Promise<any> {
        return new Promise (resolve =>{
            this.users.push(user)
            resolve(user)
        })
    }
}
