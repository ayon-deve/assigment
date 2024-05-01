import { ApiProperty } from "@nestjs/swagger";

export class listBody {
    @ApiProperty({
        example: {
            'limit': 5,
            'skip': 0
        },
        description: 'limit and skip configaruation default limit 5 and default skip 0',
    })
    condition: {
        limit: number,
        skip: number
    };

    @ApiProperty({
        example: {
            
        },
        description: 'search configaruation default none',
    })
    searchcondition: object;

    @ApiProperty({
        example: {
            type: 'desc',
            field: 'created_on'
        },
        description: 'search configaruation default none',
    })
    sort: {
        type: string,
        field: string
    };

    @ApiProperty({
        example: {},
        description: 'projection default none'
    })
    project: object;


    @ApiProperty({
        example: '',
        description: 'search configaruation default none',
    })
    token: string;
}