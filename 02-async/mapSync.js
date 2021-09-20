//simple mapsync function
function mapSync(arr, onFinish){
    let prevError
    let remaining = arr.length
    const results = []

    arr.forEach((item, i)=>{
        const milliseconds = item * 1000
        setTimeout(
            ()=>console.log(`Now the item is ${item}, wait for ${milliseconds}`),
            milliseconds
        )
        results[i] = item * 3
        remaining--

        if(!remaining) onFinish(null, results)
    });
    return results
}

numbers = [3,4,5,6]
mapSync(numbers, (err, results) =>{
    if(err) return console.error(err)

    results.forEach(console.log)
    console.log('done!')
})