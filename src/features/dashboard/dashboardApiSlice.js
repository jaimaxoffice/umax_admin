
import {apiSlice} from "../../api/umaxApiSlice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDetails: builder.query({
            query: () => ({
                url: '/admin/dashboard_details',
                method: 'GET', 
            })
        })
    })
})

export const {useGetDetailsQuery} = dashboardApiSlice;