const expressJwt=require("express-jwt")

const authJwt=()=> {
    const secret=process.env.JWT_SECRET_KEY_AUTH
    const apiUrl=process.env.API_URL
    return expressJwt({secret,algorithms: ['HS256'],isRevoked:isRevoked}).unless({
        path:[ 
           {url:/\/api\/v1\/product(.*)/,methods:['GET',"OPTIONS"]},
           {url:/\/api\/v1\/category(.*)/,methods:['GET',"OPTIONS"]},
           `${apiUrl}/user/login`,
           `${apiUrl}/user/register`
        ]
    })
}


async function isRevoked(req,payload,done){
    if(!payload.isAdmin){
       
        done(null,true)
    }
 
    done()
}

module.exports=authJwt