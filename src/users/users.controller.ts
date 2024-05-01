import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Registration } from 'src/entities/useradd.entitie';
import * as moment from 'moment';
import { Login } from 'src/entities/login.entitie';
import { fetchdata } from 'src/entities/view_profile.entitie';
import { updateProfile } from 'src/entities/update_profile.entitie';

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
                created_on: moment().valueOf(),
                last_login_time: 0,
                

            }

            const updateToDatabase = await this.userService.saveCognitoUserToDB(data)
            console.log("updateToDatabase---", updateToDatabase)

            if (updateToDatabase && Object.keys(updateToDatabase).length > 0) {
                data.name = data.firstname.trim() + ' ' + data.lastname.trim()
                data.email = data.email.trim()
                data.firstname = data.firstname.trim(),
                    data.lastname = data.lastname.trim(),
                    data.password = data.password.trim(),
                    data.city = data.city.trim(),
                    data.state = data.state.trim(),
                    data.status = data.status,
                    data.zip = data.zip,
                    data.phone = data.phone
            }

            reply
                .status(HttpStatus.OK)
                .header('Content-Type', 'application/json')
                .send({
                    'status': 'success',
                    'results': updateToDatabase.results,
                    'message': updateToDatabase.message
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

    @Post('login')
    async loginUser(@Body() body: Login, @Req() request: FastifyRequest, @Res() reply: FastifyReply): Promise<any> {
        try {
            const logindata = await this.userService.logincheck(body);

            console.log("logindata---------", logindata)
            let value 
            if(logindata.message == 'Password match. Success!'){
                value = await this.userService.updatelogintime(logindata.results._id)   
                console.log("value",value);
                delete logindata.results.password;
                delete logindata.results._id;
                
            }


            reply
                .status(HttpStatus.OK)
                .header('Content-Type', 'application/json')
                .send({
                    'status': 'success',
                    'results': logindata.results? logindata.results: [],
                    'message': logindata.message
                })

        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    @Post('view-user-profile')
    async fetchdata(@Body() body: fetchdata, @Req() request: FastifyRequest, @Res() reply: FastifyReply): Promise<any> {
        try {
            const fetchvalue = await this.userService.viewprofile(body);
            if(fetchdata.length > 0) delete fetchvalue[0].password
            console.log("fetchvalue---------", fetchvalue)
          
            reply
                .status(HttpStatus.OK)
                .header('Content-Type', 'application/json')
                .send({
                    'status': 'successfully fetch',
                    'results': fetchvalue,
                })

        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    @Post('edit-user-profile')
    async updatedata(@Body() body: updateProfile, @Req() request: FastifyRequest, @Res() reply: FastifyReply): Promise<any> {
        try {
            const fetchvalue = await this.userService.updateprofile(body,body._id);
            if(fetchdata.length > 0) delete fetchvalue[0].password
            console.log("fetchvalue---------", fetchvalue)
          
            reply
                .status(HttpStatus.OK)
                .header('Content-Type', 'application/json')
                .send({
                    'status': 'successfully fetch',
                    'results': fetchvalue,
                })

        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}
