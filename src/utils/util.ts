import {Ttag} from '@/typings/route'

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

const getBigName = (name: string) =>{
    return name.replace(name[0], name[0].toUpperCase())
  }

export default {
    add,
    delRest,
    getBigName
}