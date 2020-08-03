import { UserContactInformation } from "./UserContactInformation";
import { SharedSecretType } from "./SharedSecretType";

export class USPayUser {
    userId: string;
    password: string;
    contactInformation: UserContactInformation;
    sharedSecretType: SharedSecretType;
    sharedSecretAnswer: string;
}
