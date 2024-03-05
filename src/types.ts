export interface userInfo {
    username: string,
    userId: number,
    isAdmin: boolean
}

export function instanceOfUserInfo(object: any) {
    if(typeof object === 'object' && !Array.isArray(object) && object !== null) {
        return 'username' in object && 'userId' in object && 'isAdmin' in object;
    }
    return false;
}
