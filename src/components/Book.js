import { useState, useEffect, useRef } from "react";
import logo from '../images/logo.png'
import '../App.css'
function Book() {
    const [books, setBooks] = useState([])
    const [bookId, setBookId] = useState(0)
    const [bookName, setBookName] = useState('')
    const [bookDescription, setBookDescription] = useState('')
    const [handle, setHandle] = useState('add')

    const inputRef = useRef()
    const h1Ref = useRef()
    const buttonRef = useRef()

    useEffect(() => {
        fetch('http://localhost:8080/books')
            .then(res => res.json())
            .then(res => {
                setBooks(res.result)
            })
    }, [books])

    const handleSubmitAddBook = (e) => {
        e.preventDefault()

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: bookName,
                title: bookName,
                description: bookDescription
            })
        }
        fetch('http://localhost:8080/books', options)
            .then(res => res.json())
            .then(() => {
                handleAfterSubmit()
            })
    }
    const handleDeleteBook = (bookId) => {
        const confirm = window.confirm('Bạn có chắc muốn xóa cuốn sách này!')
        if (confirm) {
            const options = {
                method: "DELETE",
            }
            fetch(`http://localhost:8080/books/${bookId}`, options)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                })
        }
    }


    const handleUpdateBook = (book) => {
        setBookName(book.name)
        setBookDescription(book.description)
        setBookId(book.id)

        setHandle('update')

        h1Ref.current.innerText = 'Update book'
        buttonRef.current.innerText = 'Update'
    }

    const handleSubmitUpdateBook = (e) => {
        e.preventDefault()

        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: bookName,
                title: bookName,
                description: bookDescription
            })
        }
        fetch(`http://localhost:8080/books/${bookId}`, options)
            .then(res => res.json())
            .then(() => {
                handleAfterSubmit()
                rehandleUpdateBook()
            })
    }

    const rehandleUpdateBook = () => {
        setBookId(0)
        setHandle('add')

        h1Ref.current.innerText = 'Add book'
        buttonRef.current.innerText = 'Add'
    }

    const handleAfterSubmit = () => {
        setBookName('')
        setBookDescription('')

        inputRef.current.focus()
    }



    return (
        <>
            <div className='container' style={{ paddingTop: '50px' }}>
                <div className='row'>
                    {books.map((item, index) => {
                        return <>
                            <div className='col' key={index}>
                                <div className="card" style={{ width: "18rem", minHeight: "320px", marginBottom: "10px" }}>
                                    <img src={logo} className="card-img-top" alt="Logo sách" />
                                    <div className="card-body bg-secondary">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">
                                            {item.description}
                                        </p>
                                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <a href="#" className="btn btn-primary">
                                                Xem chi tiết
                                            </a>
                                            <a href="#" className="btn btn-danger" onClick={() => {
                                                handleDeleteBook(item.id)
                                            }}>
                                                Xóa
                                            </a>
                                            <a href="#" className="btn btn-success" onClick={() => {
                                                handleUpdateBook(item)
                                            }}>
                                                Cập nhật
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    })
                    }
                </div>
                <hr className='text-secondary'></hr>
                <div>
                    <form style={{ width: '500px', margin: 'auto' }}>
                        <h1 ref={h1Ref} className="h3 mb-3 fw-normal">Add book</h1>
                        <div className="form-floating">
                            <input
                                ref={inputRef}
                                type="text"
                                className="form-control"
                                id="floatingName"
                                placeholder="Name"
                                onChange={(e) => {
                                    setBookName(e.target.value)
                                }}
                                value={bookName}
                            />
                            <label htmlFor="floatingName">Name: </label>
                        </div>
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingDesciption"
                                placeholder="Desciption"
                                onChange={(e) => {
                                    setBookDescription(e.target.value)
                                }}
                                value={bookDescription}
                            />
                            <label htmlFor="floatingDesciption">Desciption: </label>
                        </div>
                        <button ref={buttonRef} className="btn btn-primary w-100 py-2" onClick={(e) => {
                            if (handle === 'add')
                                handleSubmitAddBook(e)
                            else
                                handleSubmitUpdateBook(e)
                        }}>
                            Add
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Book;