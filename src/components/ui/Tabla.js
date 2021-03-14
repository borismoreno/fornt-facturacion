import React from 'react';

const initialData = [
    // {
    //     nombreCliente: 'Marco Moreno',
    //     totalVentas: '6897.29',
    //     porcentaje: '75.72'
    // },
    // {
    //     nombreCliente: 'Martina Salazar',
    //     totalVentas: '687.29',
    //     porcentaje: '15.72'
    // },
    // {
    //     nombreCliente: 'Mateo Moreno',
    //     totalVentas: '897.29',
    //     porcentaje: '25.72'
    // },
]

const headersInitial = [
    // 'Cliente',
    // 'Total Ventas',
    // 'Porcentaje',
    // 'Total'
]

export const Tabla = ({titulo, headers = headersInitial, data = initialData}) => {
    const obtenerHeaders = () => {
        if ( headers && headers.length > 0 ) {
            // let header = Object.keys(data[0]);
            return headers.map((key, index) => {
                return <th 
                            className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                            key={index}
                        >{key}</th>
            })
        }
    }

    const obtenerFilas = () => {
        if ( data && data.length > 0 ) {
            return data.map((item, index) => {
                let claves = Object.keys(item);
                return (
                    <tr key={index}>
                        {
                            claves.map((clave, i) => {
                                return (
                                    <td 
                                        key={i}
                                        className="border-t-0 px-6 max-w-sm align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                    >{item[clave]}</td>
                                )
                            })
                        }
                    </tr>
                )
            })
        }
    }
    return (
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-gray-800">
                { titulo }
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
                <tr>
                    {
                        obtenerHeaders()
                    }                    
                </tr>
            </thead>
            <tbody>
                {
                    obtenerFilas()
                }
            </tbody>
          </table>
        </div>
      </div>
    )
}
