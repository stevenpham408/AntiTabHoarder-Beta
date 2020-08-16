import React from 'react'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useTable, usePagination, useResizeColumns, useBlockLayout} from 'react-table'
import {makeData} from '../makeData.js'
import styled from 'styled-components'
import { sec2time } from '../time.js';

import 'simplebar'
import 'simplebar/dist/simplebar.css';

const Styles = styled.div`
  padding: 1rem;
  .table{
    display:block;
    height: 250px;
    
    .th,
    .td {
      position: relative;
      height: 40px;
      font-size: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      background-color: white;

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

function Table({ columns, data, fetchData, loading, pageCount: controlledPageCount }){
    const defaultColumn = React.useMemo(
        () => ({
            minWidth: 70,
            width: 150,
            maxWidth: 400 
        }), []
    );
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
        state: {pageIndex, pageSize },

    } = useTable({
        columns, 
        data,
        defaultColumn,
        initialState: { pageIndex: 0 },
        manualPagination: true,
        pageCount: controlledPageCount,
    },
        useBlockLayout,
        useResizeColumns,
        usePagination,

    )

    React.useEffect(() => {
        fetchData({ pageIndex, pageSize })
      }, [fetchData, pageIndex, pageSize])

    return (
        <>
        <div>
        <MaUTable {...getTableProps()} data-simplebar className="table sticky">
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map((column) => (
                  <TableCell {...column.getHeaderProps()} className="th">
                    {column.render("Header")}

                    <div
                      {...column.getResizerProps()}
                      className={`resizer ${
                        column.isResizing ? "isResizing" : ""
                      }`}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()} className="tr">
                  {row.cells.map((cell) => {
                    return (
                      <TableCell {...cell.getCellProps()} className="td">
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MaUTable>
      </div>        
        
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
                
                {[10, 20, 30, 40, 50].map(pageSize => (
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

    const [loading, setLoading] = React.useState(false)
    const [pageCount, setPageCount] = React.useState(0)
    const fetchIdRef = React.useRef(0)

    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
        const fetchId = ++fetchIdRef.current

        setLoading(true)

        const doFetch = async() => {
            if(fetchId === fetchIdRef.current){      
                const startRow = pageSize * pageIndex
                const endRow = startRow + pageSize         
                const response = await makeData()
                console.log('Dis da respawns: ', response)
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
                Header: 'Title',
                accessor: '1.title'
            },
            {
                Header: 'Last Visited',
                accessor: '1.lastVisited'
            },

            {
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
        ], []);
        
    return (
        <Styles>
            <Table
            columns={columns} 
            data={data}
            fetchData = {fetchData}
            loading={loading}
            pageCount={pageCount}>
            </Table>
        </Styles>
    )
}

export default TableComponent