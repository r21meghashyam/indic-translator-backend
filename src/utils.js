export const isEmpty=(req,res,fields)=>{
    let pass=true;
    fields.forEach(field=>{
        if(pass && !req.body[field]){
            res.json({
                status: 400,
                response: `${field} field is empty.`
            });
            pass=false;
        }
    })
    return !pass;
}