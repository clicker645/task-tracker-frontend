import React, {useEffect} from 'react'
import {useItems} from "../../hooks/items.hook";
import ContentEditable from "react-contenteditable";
import {DatePicker} from "react-materialize";

export const TodoItemList = ({items}) => {
    const {updateItems} = useItems()

    const changeStatus = event => {
       const itemId = event.target.id.substr(8)
        updateItems(itemId, {[event.target.name]: event.target.value})
    }

    const updateItem = (itemId, data) => {
        updateItems(itemId, data)
    }

    useEffect(() => {
      for (let i=0;i<3;i++) {
          items.docs.forEach((item) => {
              const id = `#radio_${i}_${item._id}`
              const checkboxValue = document.querySelector(id).value
              if (checkboxValue.toString() === item.status.toString()) {
                  document.querySelector(id).checked = true
              }
          })
      }
    }, [items])

    return (
        <div>
            { items.docs.map((item) => {
                return (
                    <div className="col s12" key={item._id}>
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <ContentEditable
                                    html={item.title}
                                    className="card-title"
                                    disabled={false} // use true to disable edition
                                    onChange={event => {
                                        item.title = event.target.value
                                    }}
                                    onBlur={() => {
                                        updateItem(item._id, {title: item.title})
                                    }}
                                />
                                <ContentEditable
                                    html={item.description}
                                    disabled={false} // use true to disable edition
                                    onChange={event => {
                                        item.description = event.target.value
                                    }}
                                    onBlur={() => {
                                        updateItem(item._id, {description: item.description})
                                    }}
                                />
                                <ContentEditable
                                    html={`Deadline: ${new Date(item.deadline).toDateString()}`}
                                    className="datepicker"
                                    disabled={false} // use true to disable edition
                                    onChange={event => {
                                        item.deadline = event.target.value
                                    }}
                                    onBlur={() => {
                                        updateItem(item._id, {deadline: new Date(item.deadline).toISOString()})
                                    }}
                                />

                            </div>
                            <div className="card-action">
                                <form onChange={changeStatus}>
                                    <label htmlFor={`radio_0_${item._id}`}>
                                        <input id={`radio_0_${item._id}`} name="status" type="radio" value="Planned"/>
                                        <span>Planned</span>
                                    </label>
                                    <label htmlFor={`radio_1_${item._id}`}>
                                        <input id={`radio_1_${item._id}`} name="status" type="radio" value="Done"/>
                                        <span>Done</span>
                                    </label>
                                    <label htmlFor={`radio_2_${item._id}`}>
                                        <input id={`radio_2_${item._id}`} name="status" type="radio" value="In Progress"/>
                                        <span>In Progress</span>
                                    </label>
                                </form>


                            </div>
                        </div>
                    </div>
                )
            }) }
        </div>
        )
}