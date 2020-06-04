import React, {useContext, useEffect, useState} from "react";
import {Button, Modal, DatePicker} from "react-materialize";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";


export const CreateItemModal = ({createItem}) => {
    const auth = useContext(AuthContext)
    const { loading, error, clearError } = useHttp()
    const message = useMessage()
    const [form, setForm] = useState({
        title: '', description: '', status: 'Planned', uId: auth.userId, deadline: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        event.preventDefault()
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const changeDeadline = data => {
        const dataISO = new Date(data).toISOString()
        setForm({ ...form, deadline:  dataISO})
    }

    const createHandler = async () => {
        try {
            await createItem(form)
        } catch (e) {
            message(e)
        }
    }

            return (
            <Modal
                header="Modal Header"
                id="Modal-0"
                options={{
                    dismissible: true,
                    endingTop: '10%',
                    inDuration: 250,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    opacity: 0.5,
                    outDuration: 250,
                    preventScrolling: true,
                    startingTop: '4%'
                }}
                trigger={<Button style={{
                    margin: '10px'
                }} node="button">Add new Item</Button>}
            >

                    <div className="row">
                        <div className="input-field col s12">
                            <input id="title" type="text" name="title" onChange={changeHandler}/>
                            <label htmlFor="title">Title</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="description" type="text" name="description" onChange={changeHandler}/>
                            <label htmlFor="title">Description</label>
                        </div>
                        <div className="input-field col s12">

                            <DatePicker
                                onChange={changeDeadline}
                                id="DatePicker-5"

                            />
                        </div>

                        <Button
                            modal="close"
                            className="btn yellow darken-4"
                            onClick={createHandler}
                            disabled={loading}
                        >
                            Create new Item</Button>
                    </div>

            </Modal>
        )
}