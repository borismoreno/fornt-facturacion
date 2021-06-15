export const obtenerValorEstado = (valor) => {
    let estado = '';
    switch (valor) {
        case 'PPR':
            estado = 'POR PROCESAR'
            break;
        case 'AUT':
            estado = 'AUTORIZADO'
            break;
        case 'NAT':
            estado = 'NO AUTORIZADO'
            break;
        case 'REC':
            estado = 'RECIBIDA'
            break;
        case 'EMA':
            estado = 'PROCESADA'
            break;
        case 'DEV':
            estado = 'DEVUELTA'
            break;
        case 'ANU':
            estado = 'ANULADA'
            break;
        default:
            break;
    }
    return estado;
}