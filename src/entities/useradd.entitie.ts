import { ApiProperty } from '@nestjs/swagger';

export class Registration {
  @ApiProperty({ example: 'John', description: 'Firstname for regitration' })
  firstname: string;

  @ApiProperty({ example: 'Doe', description: 'Lastname for regitration' })
  lastname: string;

  @ApiProperty({ example: 'mukeshrep@gmail.com', description: 'Unique Email for regitration' })
  email: string;

  @ApiProperty({ example: '+17004388895', description: 'Phone Number' })
  phone: string;

  @ApiProperty({ example: 'P@ss12345', description: 'Minimum 8 characters, one symbol, one uppercase letter, one lowercase letter, one number' })
  password: string;

  // @ApiProperty({ example: '', description: 'Gender' })
  // gender: string;

  @ApiProperty({ example: 'Toronto', description: 'State' })
  state: string;

  @ApiProperty({ example: '7889244', description: 'Zip' })
  zip:any;

  @ApiProperty({ example: 0, description: 'Status (0/1)' })
  status:any;

  @ApiProperty({ example: 'Toronto', description: 'City' })
  city: string;

  @ApiProperty({ example: '4 Elgin Rd.', description: 'Address' })
  address: string;


}