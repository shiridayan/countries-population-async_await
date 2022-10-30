async function getCountryPopulation(country){
        try {
        const url = `https://countriesnow.space/api/v0.1/countries/population`;
        const options = {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({country})
        };
        const res = await fetch(url,options);
        const json =await res.json()

        if (json?.data?.populationCounts) return json.data.populationCounts.at(-1).value;
        else throw new Error(`My Error: no data for ${country}`) //app logic error message
    }catch(err){
        console.log('inside error: ',err);
        throw err;
    }      
            
    }

//--------------------------------------------------------
//  Manual - call one by one...
//--------------------------------------------------------

// (async ()=>{
//     let population = await getCountryPopulation("France");
//     console.log(`population of France is ${population}`);
//     population = await getCountryPopulation("Germany");
//     console.log(`population of Germany is ${population}`);
// })().catch(err => console.log('Error in manual:', err.message));
// manual()
//--------------------------------------------------------
//  Parallel processing 
//--------------------------------------------------------
const countries = ["France","Russia","Germany","United Kingdom","Portugal","Spain","Netherlands","Sweden","Greece","Czechia","Romania","Israel"];

// async function parallel() {
//     try{
//         const pendingPromises = countries.map((country) => getCountryPopulation(country));
//         const results = await Promise.allSettled(pendingPromises);
//         results.forEach((result, i)=> {
//             if(result.status ==='fulfilled'){
//                 console.log(`The population of ${countries[i]} is ${result.value}`);
//             }else if(result.status === 'rejected'){
//                 console.log(`The population of ${countries[i]} is unavailable: ${result.reason}`);
//             }
//         })
//         console.log('all done!!!')
//     }catch(err){
//     console.log('error in parallel:', err);

//     }

// parallel();
//------------------------------
//   Sequential processing 
//------------------------------
async function sequence() {
try{
    for(let country of countries){
        try{
     let population = await getCountryPopulation(country);
     console.log(`population of ${country} is ${population}`);
        }catch(err){
            console.error(`${country} failed: ${err.message}`);

        }
    }
    console.log('Got population for all countries');
    console.log(`countries: ${country}`);
}catch(err){
console.log('Error in sequence: ',err.message);
}
}
sequence();
