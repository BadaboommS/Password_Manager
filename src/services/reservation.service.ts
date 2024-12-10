/* import { Axios } from "./account.service";

let getReservation = () => {
    let token = localStorage.getItem('token');
    return Axios.get('/', { headers: {"Authorization" : token}});
}

let postReservation = (reservation) => {
    let token = localStorage.getItem('token');
    return Axios.post('/', reservation, { headers: {"Authorization" : token}});
}

let changeReservation = (newReservation) => {
    let token = localStorage.getItem('token');
    return Axios.put(`/${newReservation.id}`, newReservation , { headers: {"Authorization" : token}});
}

let deleteReservation = (reservationId) => {
    let token = localStorage.getItem('token');
    return Axios.delete(`/${reservationId}`, { headers: {"Authorization" : token}});
}

export const reservationService = {
    getReservation, postReservation, changeReservation, deleteReservation
} */