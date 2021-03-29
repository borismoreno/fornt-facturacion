import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startAgregarValoresFactura } from '../../actions/factura';

export const ValoresFactura = () => {
    const dispatch = useDispatch();
    const { detallesFactura, valoresFactura } = useSelector(state => state.factura);
    const [totalDescuento] = useState(0.00);
    const { subtotalDoce, subtotalCero, subtotalNoIva, subtotalExento, subtotalSinImpuestos, totalIva, valorTotal } = valoresFactura;

    const obtenerSubtotalDoce = () => {
        return detallesFactura.reduce((prev, cur) => {
            let resultado = prev;
            if (cur.tarifaIva === '2') {
                resultado = prev + cur.subtotal;
            }
            return resultado;
        }, 0);
    }

    const obtenerSubtotalCero = () => {
        return detallesFactura.reduce((prev, cur) => {
            let resultado = prev;
            if (cur.tarifaIva === '0') {
                resultado = prev + cur.subtotal;
            }
            return resultado;
        }, 0);
    }

    const obtenerSubtotalNoIva = () => {
        return detallesFactura.reduce((prev, cur) => {
            let resultado = prev;
            if (cur.tarifaIva === '6') {
                resultado = prev + cur.subtotal;
            }
            return resultado;
        }, 0);
    }

    const obtenerSubtotalExentoIva = () => {
        return detallesFactura.reduce((prev, cur) => {
            let resultado = prev;
            if (cur.tarifaIva === '7') {
                resultado = prev + cur.subtotal;
            }
            return resultado;
        }, 0);
    }

    useEffect(() => {
        const doce = obtenerSubtotalDoce();
        const cero = obtenerSubtotalCero();
        const noIva = obtenerSubtotalNoIva();
        const exento = obtenerSubtotalExentoIva();
        const iva = doce * 0.12;
        const sinImpuestos = doce + cero + noIva + exento;
        const total = sinImpuestos + iva;
        dispatch(startAgregarValoresFactura({
            subtotalDoce: doce,
            subtotalCero: cero,
            subtotalNoIva: noIva,
            subtotalExento: exento,
            subtotalSinImpuestos: sinImpuestos,
            totalIva: iva,
            valorTotal: total,
        }));
        
    }, [detallesFactura, dispatch]);
    return (
        <div className="w-full">
            { subtotalDoce > 0 && <div className="flex justify-between mb-4">
                <label className="px-2 font-thin text-base">Subtotal 12%</label>
                <label className="px-4 font-thin text-base">{ `$ ${subtotalDoce.toFixed(2)}` }</label>
            </div>}
            { subtotalCero > 0 && <div className="flex justify-between mb-4">
                <label className="px-2 font-thin text-base">Subtotal 0%</label>
                <label className="px-4 font-thin text-base">{ `$ ${subtotalCero.toFixed(2)}` }</label>
            </div>}
            { subtotalNoIva > 0 && <div className="flex justify-between mb-4">
                <label className="px-2 font-thin text-base">Subtotal No Objeto IVA</label>
                <label className="px-4 font-thin text-base">{ `$ ${subtotalNoIva.toFixed(2)}` }</label>
            </div>}
            { subtotalExento > 0 && <div className="flex justify-between mb-4">
                <label className="px-2 font-thin text-base">Subtotal Excento IVA</label>
                <label className="px-4 font-thin text-base">{ `$ ${subtotalExento.toFixed(2)}` }</label>
            </div>}
            <div className="flex justify-between mb-4">
                <label className="px-2 font-thin text-base">Descuento</label>
                <label className="px-4 font-thin text-base">{ `$ ${totalDescuento.toFixed(2)}` }</label>
            </div>
            <div className="flex justify-between mb-4">
                <label className="px-2 font-thin text-base">Subtotal sin impuestos</label>
                <label className="px-4 font-thin text-base">{ `$ ${subtotalSinImpuestos.toFixed(2)}` }</label>
            </div>
            <div className="flex justify-between mb-4">
                <label className="px-2 font-thin text-base">Valor IVA</label>
                <label className="px-4 font-thin text-base">{ `$ ${totalIva.toFixed(2)}` }</label>
            </div>
            <div className="flex justify-between mb-4">
                <label className="px-2 font-normal text-3xl">Valor Total</label>
                <label className="px-4 font-normal text-3xl">{ `$ ${valorTotal.toFixed(2)}` }</label>
            </div>
        </div>
    )
}
