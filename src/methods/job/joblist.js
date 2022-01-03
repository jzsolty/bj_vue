import {axiosOld, axiosRequest, token} from "@/axios";

export const jobList = async (posts) => {

    const test = true;

    if (test) {

        const jobLimit = 12,
            url = `https://api.bestjobs.eu/jobs?limit=${jobLimit}`;

        const response = await axiosOld.get(url)
        posts.value = response.data
        // console.log(response);

    } else {

        const jobLimit = 12,
            url = `job-operation/list?limit=${jobLimit}`;

        const response = await axiosRequest.get(url, {
            headers: {
                'Authorization': token
            }
        })
        posts.value = response.data
        // console.log(response);

    }
}