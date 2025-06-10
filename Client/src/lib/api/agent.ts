import axios from "axios";
import { store } from "../stores/store";
import { toast } from "react-toastify";
import { router } from "../../app/router/Routes";


const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

agent.interceptors.response.use(
    async response => {
        store.uiStore.isIdle()
        return response
    },
    async error => {
        store.uiStore.isIdle()

        const { status, data } = error.response

        switch (status) {
            case 400:
                if (data.errors) {
                    const modelStateErrors = []
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modelStateErrors.push(data.errors[key])
                        }

                    }
                    throw modelStateErrors.flat()
                } else {
                    toast.error(data)
                }
                break;

            case 401:
                toast.error('Unauthorised')
                break;
            case 404:
                router.navigate('/not-found')
                break;
            case 500:
                router.navigate('/server-error', { state: { error:  JSON.parse(data) } })
                break;
            default:
                break;
        }

        return Promise.reject(error)

    }


)


agent.interceptors.request.use(config => {
    store.uiStore.isBusy()
    return config
}

)



export default agent