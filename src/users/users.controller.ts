import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Registration } from 'src/entities/useradd.entitie';
import * as moment from 'moment';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(public userService: UsersService) { }

    @ApiOperation({ summary: 'Registration' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: "Body content Missing" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Something went wrong" })
    @ApiResponse({ status: HttpStatus.OK, description: 'Registration successful' })
    @Post('/signup')
    async signup(@Body() body: Registration, @Req() request: FastifyRequest, @Res() reply: FastifyReply) {
      try {
  
        const data: any = {
          firstname: body.firstname.trim(),
          lastname: body.lastname.trim(),
          name: `${body.firstname.trim()} ${body.lastname.trim()}`,
          email: body.email.toLowerCase(),
          password: body.password.trim(),
          phone: body.phone,
          state: body.state,
          zip: body.zip,
          status: body.status,
          city: body.city,
          address: body.address,
          username: '',
          cognito_user_id: '',
          created_at: moment().valueOf(),
          user_type: body.user_type,
          last_login_time: '',
          yourself: body.yourself
  
        }
  

  
  
        const updateToDatabase = await this.userService.saveCognitoUserToDB(data)
  
        if (updateToDatabase && Object.keys(updateToDatabase).length > 0) {
          data.name = data.firstname.trim() + ' ' + data.lastname.trim()
          data.email = data.email.trim()
          
        }
  
        reply
          .status(HttpStatus.OK)
          .header('Content-Type', 'application/json')
          .send({
            'status': 'success',
            'results': updateToDatabase.results,
            'message': 'user added successful'
          })
      } catch (error) {
        console.log('error==============>', error)
        reply
          .status(error.status ? error.status : HttpStatus.BAD_REQUEST)
          .header('Content-Type', 'application/json')
          .send({
            'status': 'error',
            'results': error.results ? error.results : undefined,
            'message': error.message ? error.message : 'Something Went Wrong !!'
          })
      }
    }

}
