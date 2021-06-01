import React from 'react';
import { MenuAcciones } from './MenuAcciones';

const initialData = []

const headersInitial = []

export const Tabla = ({titulo, headers = headersInitial, data = initialData, handleEliminar, acciones = false}) => {
    const obtenerHeaders = () => {
        if ( headers && headers.length > 0 ) {
            return headers.map((key, index) => {
                return <th 
                            className="px-6 bg-blue-200 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
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
                    <tr 
                        key={index}
                        className="border-b-2 hover:bg-blue-50"
                    >
                        {
                            claves.map((clave, i) => {
                                return (
                                    (clave !== "claveAcceso" && clave !== "facturaId") && <td 
                                        key={i}
                                        className="border-t-0 px-6 max-w-sm align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                    >{item[clave]}</td>
                                )
                            })
                        }
                        {
                          handleEliminar &&  <td>
                                <button
                                    className="focus:outline-none"
                                    onClick={() => handleEliminar(index)}
                                >
                                    <i className="far fa-trash-alt cursor-pointer hover:text-red-500 focus:outline-none"></i>
                                </button>
                            </td>
                            
                        }
                        {
                            acciones && <MenuAcciones
                                claveAcceso={item["claveAcceso"]}
                                estado={item["estado"]}
                                facturaId={item["facturaId"]}
                            />
                        }
                    </tr>
                )
            })
        }
    }
    return (
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        { titulo && <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-gray-800">
                { titulo }
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
            </div>
          </div>
        </div>}
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
