import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const ValoresFactura = () => {
    const { detallesFactura } = useSelector(state => state.factura);
    useEffect(() => {
        console.log(detallesFactura);
    }, [detallesFactura])
    return (
        <div className="w-full">
            <div className="flex justify-between mb-4">
                <label className="px-2 font-thin text-lg">Subtotal 12%</label>
                <label className="px-4 font-thin text-lg">180.00</label>
            </div>
            <div className="flex justify-between mb-4">
                <label className="px-2 font-thin text-lg">Subtotal 0%</label>
                <label className="px-4 font-thin text-lg">10.00</label>
            </div>
            <div className="flex justify-between mb-4">
                <label className="px-2 font-thin text-lg">Subtotal No Objeto IVA</label>
                <label className="px-4 font-thin text-lg">180.00</label>
            </div>
            <div className="flex justify-between mb-4">
                <label className="px-2 font-thin text-lg">Subtotal Excento IVA</label>
                <label className="px-4 font-thin text-lg">180.00</label>
            </div>
            <div className="flex justify-between mb-4">
                <label className="px-2 font-thin text-lg">Descuento</label>
                <label className="px-4 font-thin text-lg">180.00</label>
            </div>
            <div className="flex justify-between mb-4">
                <label className="px-2 font-thin text-lg">Subtotal</label>
                <label className="px-4 font-thin text-lg">180.00</label>
            </div>
            <div className="flex justify-between mb-4">
                <label className="px-2 font-thin text-lg">Valor IVA</label>
                <label className="px-4 font-thin text-lg">180.00</label>
            </div>
        </div>
    )
}
