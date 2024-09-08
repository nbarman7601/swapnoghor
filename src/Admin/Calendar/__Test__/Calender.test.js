import { render, screen } from "@testing-library/react"
import { InstallmentListPopUP } from "../InstallmentList"

describe("Test Calender function", ()=>{

    test("Installment List should be open", async()=>{
        const Installments = [
            {
                "_id": "66517897473c37220dec9b4a",
                "loanId": {
                    "fcAmount": 0,
                    "product": "",
                    "_id": "66517897473c37220dec9b15",
                    "customer": {
                        "_id": "66517896ef5d934db316a958",
                        "identityNo": "123456795",
                        "name": "SANCHITA KARJEE",
                        "__v": 0,
                        "addedBy": null,
                        "address": "BOKRIBARI TAPSITALA,undefined",
                        "age": "30",
                        "createdAt": "2024-05-25T05:35:18.973Z",
                        "deletedAt": null,
                        "group": {
                            "lo": null,
                            "_id": "66517896ef5d934db316a88f",
                            "name": "BOKRIBARI TAPSITALA",
                            "__v": 0,
                            "status": "active",
                            "weekday": "Saturday"
                        },
                        "guardian": "BALIRAM KARJEE",
                        "identityProof": "Adhar",
                        "isverified": false,
                        "phone": "9734033148",
                        "status": "active",
                        "updatedAt": "2024-05-25T05:35:18.973Z",
                        "verifiedBy": null
                    },
                    "downpayment": 2000,
                    "totalAmt": 45000,
                    "loanAmt": 7050,
                    "precollection_amt": 450,
                    "extra": 0,
                    "installment_duration": "0",
                    "installment_interval": "1M",
                    "installment_amt": 150,
                    "installment_start_date": "2024-05-30T00:00:00.000Z",
                    "noOfInstallment": 0,
                    "status": "active",
                    "sanctioned_date": "2023-06-16T00:00:00.000Z",
                    "createdAt": "2024-05-25T05:35:19.359Z",
                    "updatedAt": "2024-05-25T05:35:19.359Z",
                    "__v": 0
                },
                "installment_date": "2024-08-30T00:00:00.000Z",
                "installmentAmt": 150,
                "actualAmt": 0,
                "installmentNo": 4,
                "status": "active",
                "paymnentAt": null,
                "collectedBy": null,
                "__v": 0,
                "createdAt": "2024-05-25T05:35:19.755Z",
                "updatedAt": "2024-05-25T05:35:19.755Z"
            },
            {
                "_id": "66517897473c37220dec9b7a",
                "loanId": {
                    "fcAmount": 0,
                    "product": "",
                    "_id": "66517897473c37220dec9b17",
                    "customer": {
                        "_id": "66517896ef5d934db316a95c",
                        "name": "PRITI ROY",
                        "identityNo": "123456801",
                        "__v": 0,
                        "addedBy": null,
                        "address": "SALBARI BRIDGE,undefined",
                        "age": "30",
                        "createdAt": "2024-05-25T05:35:18.981Z",
                        "deletedAt": null,
                        "group": {
                            "_id": "66517896ef5d934db316a88d",
                            "name": "SALBARI BRIDGE",
                            "__v": 0,
                            "status": "active",
                            "weekday": "Wednesday",
                            "lo": {
                                "otp": 0,
                                "_id": "664e1eaba6ea2b0a655b0ba1",
                                "firstName": "Nandan",
                                "lastName": "Barman",
                                "role": "admin",
                                "gender": "male",
                                "dob": "1993-04-14T00:00:00.000Z",
                                "email": "nbarman760@gmail.com",
                                "phone": "9933369927",
                                "status": "active",
                                "deletedAt": null,
                                "createdAt": "2024-05-22T16:34:51.149Z",
                                "updatedAt": "2024-05-22T16:34:51.149Z",
                                "__v": 0
                            }
                        },
                        "guardian": "NARANATH ROY",
                        "identityProof": "Adhar",
                        "isverified": false,
                        "phone": "8918573175",
                        "status": "active",
                        "updatedAt": "2024-05-25T05:35:18.981Z",
                        "verifiedBy": null
                    },
                    "downpayment": 2000,
                    "totalAmt": 45000,
                    "loanAmt": 10900,
                    "precollection_amt": 3800,
                    "extra": 0,
                    "installment_duration": "0",
                    "installment_interval": "1M",
                    "installment_amt": 150,
                    "installment_start_date": "2024-05-30T00:00:00.000Z",
                    "noOfInstallment": 0,
                    "status": "active",
                    "sanctioned_date": "2023-05-14T00:00:00.000Z",
                    "createdAt": "2024-05-25T05:35:19.364Z",
                    "updatedAt": "2024-05-25T05:35:19.364Z",
                    "__v": 0
                },
                "installment_date": "2024-08-30T00:00:00.000Z",
                "installmentAmt": 150,
                "actualAmt": 0,
                "installmentNo": 4,
                "status": "active",
                "paymnentAt": null,
                "collectedBy": null,
                "__v": 0,
                "createdAt": "2024-05-25T05:35:19.780Z",
                "updatedAt": "2024-05-25T05:35:19.780Z"
            },
            {
                "_id": "66517897473c37220dec9bc3",
                "loanId": {
                    "fcAmount": 0,
                    "product": "",
                    "_id": "66517897473c37220dec9b11",
                    "customer": {
                        "_id": "66517896ef5d934db316a946",
                        "identityNo": "123456797",
                        "name": "CITTRA SAIBHYA",
                        "__v": 0,
                        "addedBy": null,
                        "address": "Machpara,undefined",
                        "age": "30",
                        "createdAt": "2024-05-25T05:35:18.976Z",
                        "deletedAt": null,
                        "group": {
                            "lo": null,
                            "_id": "66517896ef5d934db316a885",
                            "name": "Machpara",
                            "__v": 0,
                            "status": "active",
                            "weekday": "Monday"
                        },
                        "guardian": "PURNA SAIBHYA",
                        "identityProof": "Adhar",
                        "isverified": false,
                        "phone": "8515013184",
                        "status": "active",
                        "updatedAt": "2024-05-25T05:35:18.976Z",
                        "verifiedBy": null
                    },
                    "downpayment": 2000,
                    "totalAmt": 45000,
                    "loanAmt": 11950,
                    "precollection_amt": 1600,
                    "extra": 0,
                    "installment_duration": "0",
                    "installment_interval": "1M",
                    "installment_amt": 150,
                    "installment_start_date": "2024-06-02T00:00:00.000Z",
                    "noOfInstallment": 0,
                    "status": "active",
                    "sanctioned_date": "2023-04-28T00:00:00.000Z",
                    "createdAt": "2024-05-25T05:35:19.351Z",
                    "updatedAt": "2024-05-25T05:35:19.351Z",
                    "__v": 0
                },
                "installment_date": "2024-08-02T00:00:00.000Z",
                "installmentAmt": 150,
                "actualAmt": 0,
                "installmentNo": 3,
                "status": "active",
                "paymnentAt": null,
                "collectedBy": null,
                "__v": 0,
                "createdAt": "2024-05-25T05:35:19.804Z",
                "updatedAt": "2024-05-25T05:35:19.804Z"
            }
        ]
        render(<InstallmentListPopUP 
            currentMonth={8} 
            currentYear={2024}  
            installments={Installments}/>);
        const todayDate = screen.getAllByTestId('today_date');

        expect(todayDate).toHaveTextContent("30 Aug, 2024");
    })
})