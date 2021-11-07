import type {Ttag} from '@/typings/route'

const add = (a:number,b:number)=>a+b

const delRest = (origin:Ttag[],delKeys:string[])=>{
    if(delKeys && delKeys.length){
       const index = origin.findIndex((res:Ttag)=>res.key===delKeys[0])
       if(index>=0){
           origin.splice(index,1)
       }
       delKeys.shift()
       delRest(origin,delKeys)
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