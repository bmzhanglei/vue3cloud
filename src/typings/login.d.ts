export type LoginState = {
    username: string;
    password: string;
    verify: string;
    tip?:string
}

interface VerifyCode {
    data: string | undefined;
    text: string | undefined;
  }

interface UserInfo{
    email?: string,
    id?: number
    roleId?: number
    status?: number
    username?: string,
    avatar?:string
}

interface Role{
    id:number,
    name_cn:string,
    name_en:string
}

interface Result {
    status:number,
    tip?:string,
    msg?:string
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
