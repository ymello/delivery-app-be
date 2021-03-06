import {
  Controller,
  Post,
  Body,
  Logger,
  UseGuards,
  Get,
  Request,
  Req, 
  Param
} from '@nestjs/common';
import { RegisterDto } from './dto/Register.dto';
import { AuthService } from './auth.service';
import { MongoRepository } from 'typeorm';
import { User } from './entities/User.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/Login.dto';
import { updateUserdto } from './dto/UpdateUser.dto';
import { UpdateAddress } from './dto/UpdateAddress.dto';

@Controller('api/v1/auth')
export class AuthController {
  private logger = new Logger('Auth Controller');
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  getUser(@Request() req: any) {
    this.logger.verbose(`User Retrieved `);
    return this.authService.getUser(req);
  }

  @Get('alluser')
  getAllUser(@Request() req: any) {
    //this.logger.verbose(`User Retrieved `);
    return this.authService.getAllUsers(req);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req, @Body() loginDto: LoginDto) {
    this.logger.verbose(`user Logged in ${req.user.email}`);
    return this.authService.login(req.user);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<any> {
    return this.authService.register(registerDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('updateuser')
  updateUser(@Req() req, @Body() body: updateUserdto) {
    return this.authService.updateUser(req.user.email, body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('addUserAddress')
  addUserAddress(@Req() req,@Body() body:UpdateAddress){
    return this.authService.addUserAddress(req.user,body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('deleteUserAddress/:id')
  deleteUserAddress(@Req() req,@Param('id') id:string)
  {
    return this.authService.deleteUserAddress(req.user,id);
  }
}
