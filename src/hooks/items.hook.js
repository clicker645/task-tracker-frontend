import {useState, useCallback, useContext} from 'react'
import {useHttp} from "./http.hook";
import {AuthContext} from "../context/AuthContext";

export const useItems = () => {
    const [items, setItems] = useState({
        docs: [], totalDocs: 0, limit: 0, totalPages: 0, page: 0,
        pagingCounter: 0, hasPrevPage: false, hasNextPage: true,
        prevPage: null, nextPage: 0
    })
    const {loading, request} = useHttp()
    const auth = useContext(AuthContext)

    const fetchItems = useCallback(async () => {
        try {
            const fetched = await request(`/item/${auth.userId}`, 'GET', null, {
                Authorization: `${auth.token}`
            })
            setItems(fetched)
        } catch (e) {
            console.log(e)
        }
    }, [auth, request])

    const createItems = useCallback(async (form) => {
        try{
            await request('/item', 'POST', {...form})
            await fetchItems()
        } catch (e) {
            throw new Error(e)
        }
    }, [request, items, fetchItems])

   const updateItems = useCallback(async (id, form) => {
       try {
           const data = await request(`/item/${id}`, 'PATCH', {...form},{
               Authorization: `${auth.token}`
           })
           if (data.ok) {
               const newItems = items
               newItems.docs.forEach(item => {
                   if(item._id.toString() === id.toString()) {
                       for (let [key, value] in Object.entries(form)) {
                            item[key] = value
                       }
                   }
               })

               await setItems(newItems)
           }

       } catch (e) {
           console.log(e)
       }
   }, [request, items, setItems, auth])

    return {items, loading, fetchItems, createItems, updateItems}
}