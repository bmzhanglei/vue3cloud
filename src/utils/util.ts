import {Ttag} from '@/types/route'

const add = (a:number,b:number)=>a+b

const delRest = (origin:Ttag[],key:string,delKeys:string[])=>{
    if(delKeys && delKeys.length){
       const index = origin.findIndex(res=>res[key]===delKeys[0])
       if(index>=0){
           origin.splice(index,1)
       }
       delKeys.shift()
       delRest(origin,key,delKeys)
    }    
}

export default {
    add,
    delRest
}