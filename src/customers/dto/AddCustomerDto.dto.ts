import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
export class AddCustomerDto {
    @ApiProperty({ example: null })
    @IsString()
    name: string;
  
    @ApiProperty({ example: null })
    @IsNumber()
    number: number;
  
    @ApiProperty({ example: null })
    @IsString()
    email: string;
}