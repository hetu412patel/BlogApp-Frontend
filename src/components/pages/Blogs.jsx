import React, { useEffect, useState } from 'react'
import {APIS} from "../../url/url"
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/styles/ag-grid.css'; 
import "ag-grid-community/styles/ag-theme-alpine.css";

// import openSocket from 'socket.io-client'

const AllBlogs = () => {

    const [rowData, setRowData] = useState([])

    const columnDefs = [
        {field:'title', sortable: true, filter: true },
        {field:'description', sortable: true, filter: true, width: 550, maxWidth: 900},
        {field:'author', sortable: true, filter: true},
        {field:'category', sortable: true, filter: true}
      ]

      useEffect(() => {
        fetch(`${APIS.BLOG_API}/allblogs`)
        .then((res) => res.json())
        .then(rowData => {
          return setRowData(rowData); 
         })
      },[])

  return (
    <div>
        <div className='ag-theme-alpine' style={{height:500, width: 1160, margin: '50px 90px'}}>
            <AgGridReact rowData = {rowData} columnDefs = {columnDefs} />
        </div>
    </div>
  )
}

export default AllBlogs