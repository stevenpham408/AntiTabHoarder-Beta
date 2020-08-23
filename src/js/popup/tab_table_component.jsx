import React from 'react'

import { useTable, usePagination, useResizeColumns, useBlockLayout} from 'react-table'
import {makeData} from '../makeData.js'
import styled from 'styled-components'
import { sec2time } from '../time.js';
import { useSticky } from 'react-table-sticky';

import 'simplebar'
import 'simplebar/dist/simplebar.css';

const Styles = styled.div`
padding: 1rem;
.table{
  display:block;
  height: 250px;
  overflow:auto;

  .th{
    height: 25px;
    text-align: left;
    padding-left: 5px;
  }

  .td{
    height: 40px;
    padding-top:10px;
    text-align: left;
  }

  .th:nth-child(3),
  .td:nth-child(3){
    text-align: right;
    padding-right: 5px;
  }

  .th:nth-child(4),
  .td:nth-child(4){
    text-align: right;
    padding-right: 5px;
  }
  .th,
  .td {
    position: relative;
    font-size: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: white;
    overflow: hidden;


    :last-child {
      border-right: 0;
    }
    
    
    .resizer {
      display: inline-block;
      background: darkgray;
      width: 3px;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      transform: translateX(50%);
      z-index: 1;
      ${'' /* prevents from scrolling while dragging on touch devices */}
      touch-action:none;
      &.isResizing {
        background: gray;
      }
    }
  }
  
  &.sticky {
    .header,
    .footer {
      position: sticky;
      z-index: 1;
      width: fit-content;
    }
    
    .header {
      top: 0;
      box-shadow: 0px 3px 3px #ccc;
    }
    
    .footer {
      bottom: 0;
      box-shadow: 0px -3px 3px #ccc;
    }
    
    .body {
      position: relative;
      z-index: 0;
    }
    
    [data-sticky-td] {
      position: sticky;
    }
    
    [data-sticky-last-left-td] {
      box-shadow: 2px 0px 3px #ccc;
    }
    
    [data-sticky-first-right-td] {
      box-shadow: -2px 0px 3px #ccc;
    }
  }
}
`;

function Table({ columns, data, fetchData, pageCount: controlledPageCount, count}){
    const { 
        getTableProps, 
        getTableBodyProps,
        headerGroups, 
        rows, 
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize},

    } = useTable({
        columns, 
        data,
        initialState: { pageIndex: 0},
        manualPagination: true,
        pageCount: controlledPageCount,
    },
        useBlockLayout,
        useSticky,
        useResizeColumns,
        usePagination,
    )

    // Will rerender the pagination when a change in the dependencies is detected 
    React.useEffect(() => {
      fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex, pageSize, count])

    return (
        <>
        <div {...getTableProps()} data-simplebar className="table sticky">
          <div className='header'>
            {headerGroups.map((headerGroup) => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map((column) => (
                  <div {...column.getHeaderProps()} className="th">
                    {column.render("Header")}
                    <div
                      {...column.getResizerProps()}
                      className={`resizer ${
                        column.isResizing ? "isResizing" : ""
                      }`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (

                <div {...row.getRowProps()} 
                className="tr" >
                  {row.cells.map((cell) => {
                    return (
                      <div {...cell.getCellProps()} className="td">
                        {cell.render("Cell")}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div >
        
        <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
            </button>{' '}
            
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
            </button>{' '}
            
            <button onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
            </button>{' '}
            
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {'>>'}
            </button>{' '}
            <span>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
            </span>

            <span>
                | Go to page:{' '} 
                <input
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                    }}
                    style={{ width: '100px' }}
                />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                
                {[3, 10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                </option>
                ))}
            </select>
        </div>
        </>
    );
} 

function TableComponent(){
    const [data, setData] = React.useState([])
    const[count, setCount] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const [pageCount, setPageCount] = React.useState(0)
    const fetchIdRef = React.useRef(0)

    // When the user clicks 'Bookmark',
    // (1) Send a message to background.js with 'insert' & row data
    function saveToIndexedDB(row){
      chrome.runtime.sendMessage({
        message: 'insert',
        newBookmark: row
      })
    }

    // When the user clicks 'Delete', 
    // (1) remove the tab, 
    // (2) rerender the pagination component, 
    // (3) free the listener afterwards
    function removeAndRender(row){
      chrome.tabs.remove(row)
      chrome.tabs.onRemoved.addListener(function removedCallback(tabId, removeInfo){
        setCount(count + 1);
        chrome.tabs.onRemoved.removeListener(removedCallback);
      })      
    }

    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
        const fetchId = ++fetchIdRef.current
        setLoading(true)

        const doFetch = async() => {
            if(fetchId === fetchIdRef.current){      
                const startRow = pageSize * pageIndex
                const endRow = startRow + pageSize         
                const response = await makeData()
                setData(response.slice(startRow, endRow))
                setPageCount(Math.ceil(response.length / pageSize))
                setLoading(false)
            }
        }
        doFetch();
    }, []);
 
    const columns = React.useMemo(
        () => [
          {
            width: 55,
            Header: 'Actions',
            accessor: 'delete',
            Cell: (tableProps) => {
              return (
                <div>
                  <span 
                    style={{cursor: 'pointer', color: 'blue', textDecoration:'underline'}}
                    onClick = {() => {saveToIndexedDB(tableProps.row.original[1])}}
                  > Bookmark </span>
                  <br></br>
                  <span 
                    style={{cursor:'pointer', color: 'blue', textDecoration: 'underline' }}
                    onClick = {() => {removeAndRender(tableProps.row.original[0]) }}> 
                    Delete 
                  </span> 
                </div>
              )
            }

          },
          
          {
            width: 225,
            Header: 'Title',
            accessor: '1.title'
          },

          {
            width:100,
            Header: 'Last Visited',
            accessor: '1.lastVisited'
          },

          {
            width: 75,
            Header: 'Time Elapsed',
            accessor: (rows) => {
              if(rows[1] != undefined){
                if(rows[1].timeElapsed != 0 && rows[1].timeElapsed != undefined){
                  return sec2time(rows[1].timeElapsed);
                }
                else{
                  return ''
                }
              }
              
              else{
                throw "the row is undefined" 
              }
            }
          }
        ], [count]);
        
        return (
        <Styles>
            <Table
            columns={columns} 
            data={data}
            fetchData = {fetchData}
            loading={loading}
            pageCount={pageCount}
            count={count}>
            </Table>
        </Styles>
    )
}

export default TableComponent