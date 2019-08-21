import request from 'request';

export const hitElastic = (options) => {
    console.log(JSON.stringify(options));
    return new Promise((resolve, reject) => {
        request.get(options, (error, response, body) => {
            if (error || response.statusCode != 200) {
                console.log("error:",error)
                reject(new Error('Some Error Occurred'));
            } else {
                resolve(body.hits);
            }
        });
    });
};


export const getSuggestedLines = async (searchTxt) => {
    let queryClause = {
        "query" : {
            "match":{
                "text_entry" : searchTxt
            }
        }
    }

    let reqObject = {
        url:"http://localhost:9200/shakespeare/_search?pretty",
        json:queryClause
    };

    let results = {}

    try{
        results = await hitElastic(reqObject);
        console.log("results:",results)
    }catch(e){
        results = {
            error : e
        }
    }

    return results;
}