import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { getBooks, returnBook, borrowBook, returnBookAPI, borrowBookAPI } from "../../api";
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import './book.css'
import { ToastContainer, toast } from 'react-toastify';

const Books = () => {
    const [bookList, setBookList] = useState([]);
    const [fetch, setFetch] = useState(true);
    const cellColumn = [
        "Name",
        "Number of Copies",
        " ",
        " ",
    ]

    useEffect(()=>{
        const fetchBooks = async() => {
            const result = await getBooks();
            const tempData = result.data.map((each)=>{
                return {
                    ...each,
                    CurrentCount: each.NumberOfCopies
                }
            })
            setBookList(result.data)
        }
        if(fetch){
         fetchBooks();
        }
        setFetch(false);
       
    },[fetch])

    const returnBook = async(id) => {
        const payload = bookList.filter((each)=>each._id === id)[0];
        const res = await returnBookAPI(id,{...payload , CurrentCount: payload.CurrentCount });
        setFetch(true);
        if(res.data.message){
            console.log("toast")
            toast.error(res.data.message)
        }
    }
    const borrowBook = async(id) => {
        const payload = bookList.filter((each)=>each._id === id)[0];
        borrowBookAPI(id).then((res)=>{
            if(res.data.message){
                console.log("toast")
                toast.error(res.data.message)
            }
            setFetch(true);
        }).catch((err)=>{
            console.log("err",err)
        })
    }
    return (
        <Fragment>
            <div>in books</div>
            {bookList?.length && (
               <Table>
                <TableHead className="table-head">
                    <TableRow>
                    {cellColumn.map((eachCell)=> {
                       return (
                       <TableCell>
                            {eachCell}
                       </TableCell> 
                       ) 
                    })}
                    </TableRow>
                    
                </TableHead>
                <TableBody>
                    {bookList?.map((eachrow)=>{
                        return (
                            <TableRow>
                                <TableCell>
                                    {eachrow.BookName}
                                </TableCell>
                                <TableCell>
                                    {eachrow.CurrentCount}
                                </TableCell>
                                <TableCell >
                                    <button onClick={() => returnBook(eachrow._id)}>
                                       Return 
                                    </button>
                                    
                                </TableCell>
                                <TableCell>
                                    <button onClick={() => borrowBook(eachrow._id)}>
                                       Borrow 
                                    </button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
               </Table>
            )}
        </Fragment>

    )
}

export default Books;