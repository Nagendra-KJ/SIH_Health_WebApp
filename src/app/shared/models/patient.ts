export class Patient {
    name: string;
    age: number;
    height: number;
    weight: number;
    bloodType: string;
    appointmentDate: any;
    phoneNumber: number;
    key: string;
    constructor() {
        this.name = "";
        this.age = 0;
        this.height = 0;
        this.weight = 0;
        this.bloodType = "";
        this.appointmentDate = "";
        this.phoneNumber = 0;
        this.key = "";
    }
}