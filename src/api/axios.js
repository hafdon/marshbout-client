import axios from 'axios'

axios.defaults.withCredentials = true

const instance = axios.create({
    baseURL: 'http://10.0.1.7:3000',
    // withCredentials: true,
})

// Add a request interceptor
instance.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        console.log(`axios interceptor on request (${config.url})`, config)
        return config
    },
    function(error) {
        // Do something with request error
        console.log('axios interceptor on request (error)', error)
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    function(config) {
        // Do something before request is sent
        try {
            console.log(
                // `axios interceptor on response (${config.config.url})`,
                config
            )
            return config
        } catch (e) {
            return Promise.reject(e)
        }
    }
    // async function(error) {
    //     // Do something with request error
    //     // error : {config,request,response,isAxiosError,toJSON}
    //     // console.log(
    //     //     `axios interceptor on response error (${error.config.url})`,
    //     //     'config',
    //     //     error.config,
    //     //     'request',
    //     //     error.request, //*** has .status*/
    //     //     'response',
    //     //     error.response, //*** has .status */
    //     //     'isAxiosError',
    //     //     error.ixAxiosError,
    //     //     'message',
    //     //     error.message,
    //     //     'name',
    //     //     error.name,
    //     //     'description',
    //     //     error.description,
    //     //     'number',
    //     //     error.number
    //     // )

    //     // let { url } = error.response.config
    //     // let endpoint = url.substr(url.lastIndexOf('/') + 1)
    //     // console.log('url on error', url, 'endpoint', endpoint)
    //     debugger

    //     if (error.message == 'Network Error') {
    //         // router.push({ name: 'error-network' })
    //         console.log({ error })
    //     } else if (
    //         error.response.status === 401 &&
    //         !['logout', 'ping'].includes(endpoint)
    //     ) {
    //         console.log(
    //             "We're unauthorized and did not send to /logout or /ping"
    //         )
    //         debugger
    //         console.log(
    //             'Received 401: Unauthorized from server. Trying to log in again ?'
    //         )
    //         // await store.dispatch('auth/logout')
    //         console.log(`awaited store.dispatch('auth/logout') `)
    //         // router.push({ name: 'home' })
    //         return Promise.resolve()
    //     } else if (
    //         error.response.status === 401 &&
    //         !['ping'].includes(endpoint)
    //     ) {
    //         console.log('received 401 error on /user/ping')
    //         // take some action, maybe same as 'logout' recursive attempt
    //         //
    //     } else {
    //         return Promise.reject(error)
    //     }
    // }
)

export default instance
