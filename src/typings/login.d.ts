export type LoginState = {
    username:string,
    password:string,
    verify:string
}

interface UserInfo{
    email: string,
    id: number
    roleId: number
    status: number
    username: string
}


interface Result {
    status:number,
    tip?:string,
    result?:{roleId?:number}
}

interface Menu{
    breadcrumb:number,
    component: string,
    hidden: number,
    icon: string,
    id: number,
    level: number,
    name: string,
    path: string,
    pid: number,
    redirect: string,
    sort: number,
    titleCn: string,
    titleEn: string
}

declare enum M{
    One,
    Two
}
