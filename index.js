const bodyParser = require('body-parser');
let express = require('express');
let fs = require('fs');
let app = express();

function getfunction() {
    let data = fs.readFileSync("studdata.json", "utf-8");
    return JSON.parse(data);
}

app.use(bodyParser.json())

app.get('/student', (req, res) => {
    let data = fs.readFileSync("studdata.json", "utf-8");
    res.send(JSON.parse(data));
}
)

app.get('/student/:ID', (req, res) => {

    let data = getfunction();
    let items = data.find((i) => i.ID === req.params.ID);
    if(items!=null)
    {
    res.send(items);
    }
    else
    {
        res.send(JSON.parse(`[{"Data":"No data found"}]`));
    }
})

app.post('/student', (req, res) => {
    let data = getfunction();
    data.push(req.body);
    fs.writeFileSync("studdata.json", JSON.stringify(data));
    res.send('Added successfully.');
})

app.put('/student/:ID',(req,res)=>{
    let data = getfunction()
    let index = data.findIndex((i)=>i.ID === req.params.ID)
    if (index!= -1){
        data[index] = req.body;
        fs.writeFileSync("studdata.json",JSON.stringify(data))
        res.send('Edited successfully.');
    }
    else{
        res.send("Index not found")
    }
    
})

app.delete('/student/:ID',(req,res)=>{
    let data =getfunction()
    let index=data.findIndex((i)=>i.ID === req.params.ID)  
    if(index!= -1)
        {
            data.splice(index,1)
            fs.writeFileSync("studdata.json",JSON.stringify(data))
            res.send("data deleted");
        }
    else
    {
        res.send("Index not found")
    }
})

app.listen(2222)