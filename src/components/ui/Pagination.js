import React from 'react';

export const Pagination = ({rowsPerPage, totalRows, currentPage, setCurrentPage, setRowsPerPage}) => {
    const pageNumbers = [];
    let canNextPage = true;
    let canPreviousPage = true;
    for (let i = 0; i < Math.ceil(totalRows / rowsPerPage); i++) {
        pageNumbers.push(i);
    }
    if (currentPage === 1) {
        canPreviousPage = false;
    } else if (currentPage === pageNumbers.length) {
        canNextPage = false;
    }
    return (
        <div>
            <span className="text-sm mr-4">
                Página{' '}
                <strong>
                    {currentPage} de {pageNumbers.length}
                </strong>{' '}
            </span>
            {/* <span>
                | Ir a página: {' '}
                <input 
                    type='number' 
                    defaultValue={currentPage} 
                    max={pageNumbers.length}
                    min={1}
                    onChange={e => {
                        let pageNumber = e.target.value ? Number(e.target.value): 1;
                        if (pageNumber > pageNumbers.length) {
                            pageNumber = pageNumbers.length;
                        } else if (pageNumber < 1) {
                            pageNumber = 1;
                        }

                        setCurrentPage(pageNumber)
                    }}
                    style={{width: '50px'}}
                />
            </span> */}
            <select 
                value={rowsPerPage} 
                onChange={e => {
                    setRowsPerPage(Number(e.target.value))
                    setCurrentPage(1);
                }}
                className="mr-4 bg-white p-3 border text-xs border-gray-300 rounded-md focus:outline-none"
            >
                {
                    [10, 25, 50].map(pageSize => (
                        <option 
                            key={pageSize} 
                            value={pageSize}
                            className="bg-blue-700"
                        >
                            Mostrar {pageSize}
                        </option>
                    ))
                }
            </select>
            <button 
                onClick={() => setCurrentPage(1)} 
                disabled={!canPreviousPage}
                className="px-4 border-2 rounded-md border-blue-400 mr-2 py-2 text-xs hover:bg-blue-100 disabled:opacity-20"
            >{'<<'}</button>
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={!canPreviousPage}
                className="px-4 border-2 rounded-md border-blue-400 mr-2 text-xs py-2 hover:bg-blue-100 disabled:opacity-20"
            >Anterior</button>
            <button 
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={!canNextPage}
                className="px-4 border-2 rounded-md border-blue-400 mr-2 text-xs py-2 hover:bg-blue-100 disabled:opacity-20"
            >Siguiente</button>
            <button 
                onClick={() => setCurrentPage(pageNumbers.length)} 
                disabled={!canNextPage}
                className="px-4 border-2 rounded-md border-blue-400 mr-2 text-xs py-2 hover:bg-blue-100 disabled:opacity-20"
            >{'>>'}</button>
        </div>
    )
}
