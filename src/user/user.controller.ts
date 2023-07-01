import { Body, Param, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor(private usersService: UserService){}

    @Get()
    async getAllUsers(): Promise<User []>{
        return this.usersService.getAllUsers();
    }

    @Post()
    async addUser(@Body() userData: User): Promise<User>{
        return this.usersService.addUser(userData);
    }

    @Put('update/:id')
    async updateUser(@Param('id') id:string, @Body() userData: User): Promise<any>{
        userData.id = Number(id);
        //console.log('Update #' + userData.id);
        return this.usersService.updateUser(userData);
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id') id: string): Promise<any>{
        return this.usersService.deleteUser(Number(id));
    }

    
    //Mock Requests
    @Get('mock')
    async getAllMockUsers(){
        const users = await this.usersService.getAllMockUsers();
        return users;
    }



}
