
import store from "@/store";
import router from "@/router";
import {axiosRequest} from "@/axios";


export const submitForm = async (form) => {

    //TEST***********************************************************************************************************
    // user: szilard@neogen.biz
    // pass: szilard
    let token = '13b20c0b0e9890b594e1c15f7c747d048ca11406ce2f1b68f2033f92e5c821229'
    //***************************************************************************************************************

    const authenticate_response = await axiosRequest.post('openapi_authenticate', form);
    // console.log(authenticate_response);

    if (authenticate_response && authenticate_response.headers['x-apikey']) {
        token = authenticate_response.headers['x-apikey'];
        localStorage.setItem('token', token)
    }
    // console.log(token)

    const user_response = await axiosRequest.get('own-resume-detail', {
        headers: {
            'Authorization': token
        }
    })
    // console.log(user_response)

    if (user_response && user_response.data.privateInformation) {
        let user_name = user_response.data.privateInformation.email;
        if (user_response.data.privateInformation.name) {
            user_name = user_response.data.privateInformation.name;
        }
        localStorage.setItem('user', user_name)
        store.commit('userSet', user_name)
        // console.log(user_name)
    }

    router.push('/');

}