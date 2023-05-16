import { Report } from "../interfaces";

export const reports: Report[] = [
    {
        id: "123",
        cameraName: "camara 1",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/1/14/Calle_de_Alcal%C3%A1_%28Madrid%29_02.jpg",
        confidence: "0%",
        detection: "nothing",
        timeStamp: "2020-05-05"
    },
    {
        id: "234",
        cameraName: "camara 2",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/1/14/Calle_de_Alcal%C3%A1_%28Madrid%29_02.jpg",
        confidence: "10%",
        detection: "pistola",
        timeStamp: "2020-05-05"
    },
    {
        id: "456",
        cameraName: "camara 6",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/1/14/Calle_de_Alcal%C3%A1_%28Madrid%29_02.jpg",
        confidence: "90%",
        detection: "cuchillo",
        timeStamp: "2020-05-05"
    },
    {
        id: "789",
        cameraName: "camara 7",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/1/14/Calle_de_Alcal%C3%A1_%28Madrid%29_02.jpg",
        confidence: "0%",
        detection: "nothing",
        timeStamp: "2020-05-05"
    },
];