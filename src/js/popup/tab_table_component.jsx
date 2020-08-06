import React from 'react'
import { hot } from "react-hot-loader";
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useTable, usePagination } from 'react-table'
import {makeData} from '../makeData.js'
// import {makeData} from '../background.js'

function Table({ columns, data, fetchData, loading, pageCount: controlledPageCount }){
    const { 
        getTableProps, 
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

        initialState: { pageIndex: 0 },
        manualPagination: true,
        pageCount: controlledPageCount,
    },
        usePagination
    )

    React.useEffect(() => {
        fetchData({ pageIndex, pageSize })
      }, [fetchData, pageIndex, pageSize])

    return (
        <>
        <MaUTable {...getTableProps()}>
            <TableHead>
                {headerGroups.map(headerGroup => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                    <TableCell {...column.getHeaderProps()}>
                        {column.render("Header")}
                    </TableCell>
                    ))}
                </TableRow>
                ))}
            </TableHead>
            
            <TableBody>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                    <TableRow {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return (
                            <TableCell {...cell.getCellProps()}>
                                {cell.render('Cell')}
                            </TableCell>
                            )
                        })}
                    
                    </TableRow>
                    )
                })}
            
            </TableBody>
        </MaUTable>
        
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
                // accessor: '1.timeElapsed'
            }
        ], []);
        
    return (
    <div>
        <Table
        columns={columns} 
        data={data}
        fetchData = {fetchData}
        loading={loading}
        pageCount={pageCount}/>
    </div>
    )
}

export default hot(module)(TableComponent)