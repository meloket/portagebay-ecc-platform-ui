import { Payment } from "./Payment.model";
import { PersonalInformation } from "./PersonalInformation.model";
import { Accommodations } from "./Accommodations.model";
import { Arrival } from "./Arrival.model";
import { Homestay } from "./Homestay.model";
import { AgentInformation } from "./AgentInformation.model";
import { Residence } from "./Residence.model";

export class Application {
    public payment: Payment;
    public personalInformation: PersonalInformation;
    public accommodations: Accommodations;
    public arrival: Arrival;
    public homestay: Homestay;
    public agentInformation: AgentInformation;
    public residence: Residence;
}
