import React, {useEffect} from 'react'
import {TodoItemList} from '../components/item/ItemsList'
import {Loader} from "../components/global/Loader"
import {useItems} from "../hooks/items.hook";
import {CreateItemModal} from "../components/item/CreateItemModal";

export const ItemsListPage = () => {
    const {items, fetchItems, loading, createItems} = useItems()

    useEffect(() => {
        fetchItems()
    }, [fetchItems])

    if (loading) {
        return <Loader/>
    }

    const myItemsStyle = {
        padding: '10px',
        marginTop: '20px'
    }

    return (
        <div className="row">
            <div className="col s8 blue-grey lighten-5" style={myItemsStyle}>
                <div className="col s4">
                    <CreateItemModal createItem={createItems}/>
                </div>

            {!loading && <TodoItemList items={items} />}
                </div>
        </div>
    )
}