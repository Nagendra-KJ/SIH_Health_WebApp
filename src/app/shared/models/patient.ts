export class Patient {
    name: string;
    age: number;
    height: number;
    weight: number;
    bloodType: string;
    appointmentDate: any;
    phoneNumber: string;
    email: string;
    userId: string;
    image: string;
    constructor() {
        this.name = "";
        this.age = 0;
        this.height = 0;
        this.weight = 0;
        this.bloodType = "";
        this.appointmentDate = "";
        this.phoneNumber = "";
        this.email = "";
        this.userId = "";
        this.image = "";
    }
}