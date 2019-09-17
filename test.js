const perm = require('./index')
const _ = require('lodash')
const user=
{
    "name":"dix",
    "permissions":[
    {"name":"create-user"},
    {"name":"update-user"},
    ],
    "roles":["admin"],
    "services":[
        {"name":"yassir"},
        {"name":"food"}
    ],
    "regions":[
        {"name":"Algiers"}
    ],
    "countries":[
        {"name":"Algeria"}
    ]
}


console.log(
    new perm(user)
    .can('create-user')
    .inTeam(['food','yassir'])
    .inRegion('Algiers')
    .inCountry('Algeria')
    .check()
)
    