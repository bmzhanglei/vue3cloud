const add = (a:number,b:number)=>a+b

const delRest = (origin:object[],key:string,delKeys:string[]):object[]=>{
    // debugger
    for(let item of delKeys){
        let index = origin.findIndex(res=>res[key]===item)
        if(index>=0){
            origin.splice(index,1)
           break
        }
    }
    return origin
}

export default {
    add,
    delRest
}