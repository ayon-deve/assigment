import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ICognitoUser } from 'src/models/users/users.interface';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { Icategory } from 'src/models/category/category.interface';

@Injectable()
export class UsersService {
    @InjectModel('users') private usersmodal: Model<ICognitoUser>
    @InjectModel('category') private categorymodal: Model<Icategory>

    async saveCognitoUserToDB(userData: any): Promise<any> {
        try {

            // Check if email already exists
            const existingUser = await this.usersmodal.findOne({ email: userData.email.trim().toLowerCase() });
            if (existingUser) {
                // throw new Error('Email already exists');
                return { success: false, message: 'Email already exists' };

            }

            console.log('user data of signup ===', userData);
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
            userData.password = hashedPassword;

            const userRegistration = await this.usersmodal.create(userData);
            console.log("user registration ===", userRegistration)

            return Promise.resolve({
                status: HttpStatus.OK,
                message: 'Registration successful',
                results: userRegistration,
            });
        } catch (error) {
            console.log('error==================>', error);
            return Promise.reject({
                status: HttpStatus.BAD_REQUEST,
                message:
                    error.errors.length > 0
                        ? error.errors.map((val) => val.longMessage).join(' and ')
                        : 'Registration limit exceed',
                results: error.message,
            });
        }
    }

    async logincheck(data: any): Promise<any> {
        try {
            console.log("data------------", data)
            const projection = {
                _id: 1,
                email: 1,
                password: 1,
                name: 1,
                phone: 1,
            };
            const email_check = await this.usersmodal.findOne({ email: data.email.trim().toLowerCase() }, projection).lean()
            console.log("email_check-----------", email_check)


            if (!email_check) {
                console.log("Email not found");
                return ({
                    message: 'Email not found',

                });
            } else {
                const enteredPassword = data.password.trim();
                const hashedPassword = email_check.password;
                return new Promise((resolve, reject) => {
                    bcrypt.compare(enteredPassword, hashedPassword, function (err, result) {

                        if (err) {
                            console.log("data------------err")
                            resolve({
                                message: 'Error comparing passwords:',
                                results: err,
                            });
                        } else if (result) {
                            console.log("data------------pass")

                            resolve({
                                message: "Password match. Success!",
                                results: email_check,
                            });
                        } else {
                            console.log("data------------12")
                            resolve({
                                message: "Password does not match. Not success."
                            });
                        }
                    });
                })
            }

        }
        catch (error) {
            console.log('error--------', error)
            return Promise.reject(error)
        }
    }

    async updatelogintime(data: any): Promise<any> {
        try {
            const update_data = await this.usersmodal.updateOne({ _id: new mongoose.Types.ObjectId(data._id) }, { $set: { last_login_time: moment().valueOf() } })
            console.log("update_data--------", update_data)
            return Promise.resolve(update_data)
        }
        catch (err) {
            console.log("error", err)
            return Promise.reject(err)
        }
    }

    async viewprofile(data: any): Promise<any> {
        try {
            const fetchdata = await this.usersmodal.find({ _id: new mongoose.Types.ObjectId(data._id) }).lean()
            console.log("fetcdata", fetchdata)
            return Promise.resolve(fetchdata)
        }
        catch (error) {
            console.log('err', error)
            return Promise.reject(error)
        }

    }

    async updateprofile(data: any, _id: any): Promise<any> {
        try {
            const response = await this.usersmodal.findByIdAndUpdate(_id, { ...data, updated_on: moment().valueOf() }, { new: true }).lean()
            console.log(response)
            return Promise.resolve(response);
        }
        catch (err) {
            console.log("err", err)
            return Promise.reject(err)
        }
    }

    async getallcategorydata(): Promise<any> {
        try {
            const all_data = await this.categorymodal.find()
            return Promise.resolve(all_data)
        }
        catch (err) {
            console.log('erro', err)
            return Promise.reject(err)
        }
    }


    async bloglist(condition: any = {}, skip: number = 0, limit: number = 0, sort = {}): Promise<any> {
        try {
            console.log("Params============>>", condition, skip, limit, sort);
            let aggregation: any = [
                {
                    '$match': {
                        ...condition,
                    }
                }, {
                    '$sort': sort
                }, {
                    '$skip': skip
                }, {
                    '$limit': limit
                }, {
                    '$addFields': {
                        'question_id_obj': {
                            '$map': {
                                'input': '$question_id',
                                'as': 'questionId',
                                'in': {
                                    '$convert': {
                                        'input': '$$questionId',
                                        'to': 'objectId',
                                        'onNull': null,
                                        'onError': null
                                    }
                                }
                            }
                        }
                    }
                }, {
                    '$lookup': {
                        'from': 'questions',
                        'localField': 'question_id_obj',
                        'foreignField': '_id',
                        'as': 'question_results'
                    }
                }, {
                    '$addFields': {
                        'question': {
                            '$reduce': {
                                'input': '$question_results',
                                'initialValue': '',
                                'in': {
                                    '$concat': [
                                        '$$value', {
                                            '$cond': [
                                                {
                                                    '$gt': [
                                                        {
                                                            '$strLenCP': '$$value'
                                                        }, 0
                                                    ]
                                                }, ', ', ''
                                            ]
                                        }, {
                                            '$concat': [
                                                {
                                                    '$ifNull': [
                                                        '$$this.question', ''
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }, {
                    '$project': {
                        'question_id_obj': 0,
                        'question_results': 0
                    }
                }
            ]
            console.log('aggregation--------------------->', JSON.stringify(aggregation));
            const res = await this.categorymodal.aggregate(aggregation);
            console.log('res------------------>', res);
            return Promise.resolve(res)

        }
        catch (error) {
            console.log('error------------', error)
            return Promise.reject(error)
        }
    }

}
