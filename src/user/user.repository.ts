import { Injectable } from "@nestjs/common"
import { User } from "@prisma/client"
import { PrismaService } from "src/db/prisma.service"

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {}

    async create(userToCreate: User): Promise<User> {
        return this.prisma.user.create({ data: userToCreate });
    }

    async find(){
        return this.prisma.user.findMany();
    }
    
    async findBy(userID){
        return this.prisma.user.findUnique({where: {id: userID}});
    }

    async update(userID, userUpdated: User){
        return this.prisma.user.update({
            where: {id: userID},
            data: userUpdated
        })
    }

    async delete(userID){
        return this.prisma.user.delete({
            where: {id: userID}
        })
    }
}