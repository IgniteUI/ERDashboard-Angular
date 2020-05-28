import { VitalSignType } from "../Models/VitalSignType";

export class VitalSignData {
    id: number;
    admittanceID: number;
    vitalSignTypeID: number;
    vitalSignValue: string;
    vitalSignType: string;
    timeStamp: any;
    bloodPressureLow: number;
}