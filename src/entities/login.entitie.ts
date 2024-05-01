import { ApiProperty } from '@nestjs/swagger';

export class Login {
  @ApiProperty({ example: 'mukeshrep@gmail.com', description: 'Username' })
  email: string;

  @ApiProperty({ example: 'P@ss1234', description: 'Pasword' })
  password: string;

}

