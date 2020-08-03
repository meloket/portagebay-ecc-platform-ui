import { User } from "./User";

export class CommonHelper {

    static isSet(value: any): boolean {
        switch (typeof value) {
            case 'string':
                return value.length > 0;
            case 'number':
                return value > 0;
        }
    }

    static removeIndexFromValue(value: string): string {
        if (!value) { return value; }
        return value.split('-')[0];
    }

    static getCountryCodeFromPhoneNum(phoneNum: string): string {
        return phoneNum.split('-')[0];
    }

    static newApplication(user: User): boolean {
        console.log('Is new application? ');
        console.log(user.application);
        return (user.application == null || (typeof user.application === 'string' && user.application === 'exists'));
    }

    static isEmptyObject(obj: any): boolean {
        return Object.keys(obj).every(function(x) {
            return obj[x] === '' || obj[x] === null || obj[x] === {};
        });
    }
}
