import { ApiProperty } from '@nestjs/swagger';

export class updateProfile {
    @ApiProperty({ example: 'John', description: 'Firstname for regitration' })
    firstname: string;

    @ApiProperty({ example: 'Doe', description: 'Lastname for regitration' })
    lastname: string;

    @ApiProperty({ example: 'mukeshrep@gmail.com', description: 'Unique Email for regitration' })
    email: string;

    @ApiProperty({ example: '+17004388895', description: 'Phone Number' })
    phone: string;

    @ApiProperty({ example: 'Toronto', description: 'State' })
    state: string;

    @ApiProperty({ example: '7889244', description: 'Zip' })
    zip: any;

    @ApiProperty({ example: 0, description: 'Status (0/1)' })
    status: any;

    @ApiProperty({ example: 'Toronto', description: 'City' })
    city: string;

    @ApiProperty({ example: '4 Elgin Rd.', description: 'Address' })
    address: string;

    @ApiProperty({ example: '6631e13d38fb06d007f06603', description: 'Address' })
    _id: string;
    @ApiProperty({
        example: {
            "fileservername": "1691477743102profile_img.png",
            "name": "profile_img.png",
            "size": 32174,
            "type": "image/png",
            "path": "divine-infinity-profile-images/",
            "bucket": "all-frontend-assets",
            "baseurl": "divine-infinity-profile-images/",
        },
        description: 'image'
    })
    image: {};

}