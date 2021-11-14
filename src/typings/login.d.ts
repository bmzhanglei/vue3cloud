export type LoginState = {
    username:string,
    password:string,
    verify:string
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
    onlyChild: number,
    path: string,
    pid: number,
    redirect: string,
    sort: number,
    titleCn: string,
    titleEn: string
}
