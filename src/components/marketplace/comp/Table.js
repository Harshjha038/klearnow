import React from 'react';
import { useTable } from 'react-table';
import "./table.css"

// let thStyle = {"padding": "0.5rem","borderBottom": "1px solid lightgray", "borderRight": "1px solid lightgray", "fontWeight" : "bold", "fontSize":"18px", "color" : "blue"}
// let tdStyle = { "padding": "0.5rem", "borderBottom": "1px solid lightgray", "borderRight": "1px solid lightgray", "textAlign" : "center"}
  
function Table(props) {
    const{data,columns}=props
    
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    })
    console.log(" Portprops here",props, data)
  
    if (data === null || !data) {
      data = []
      console.log("Set DATA",data)

    }
    console.log("DATA",data)
    return (
      data && data.length > 0 ? (
        <table {...getTableProps()} style={{ "borderSpacing": "0", "border": "1px solid lightgray", "width" : "100%"}}>
          <thead style={thStyle}>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}  style={thStyle}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()} style={tdStyle}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : 'No Results Found'
    );
  }
  
export default Table;
