export enum SharedSecretType {
    AUTH,
    MOTHER,
    FATHER,
    CITY,
    PET,
    STREET,
    SCHOOL,
    TEACHER,
    TEAM,
    ZIPCODE,
    FRIEND,
    JOB,
    MUSICIAN,
    CAR,
    SHOW,
    HIGHSCHOOL,
    CONCERT,
    WORST,
    FEAR,
    NICKNAME
}

export namespace SharedSecretType {
    export function values() {
        return Object.keys(SharedSecretType).filter(
            (type) => isNaN(<any>type) && type !== 'values'
        );
    }
}