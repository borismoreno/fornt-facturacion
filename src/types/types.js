export const types = {
    authCheckingFinish: '[auth] Finish checking login state',
    authStartLogin: '[auth] Start login',
    authLogin: '[auth] Login',
    authStartRegister: '[auth] Start register',
    authStartTokenRenew: '[auth] Start token renew',
    authLogout: '[auth] Logout',

    dashFacturasEmitidas : '[dash] Facturas emitidas',
    dashTotalComprobantes : '[dash] Total comprobantes emitidos',
    dashLimpiar: '[dash] Limpiar datos dashboard',
    dashTopClientes: '[dash] Top Clientes',

    alertaMostrar: '[alerta] Mostrar alerta',
    alertaOcultar: '[alerta] Ocultar alerta',
    cargandoMostrar: '[cargando] Mostrar cargando',
    cargandoOcultar: '[cargando] Ocultar cargando',

    clientesObtener: '[clientes] Obtener clientes',
    clientesBuscar: '[clientes] Buscar cliente',
    clientesSeleccionar: '[clientes] Seleccionar cliente',
    clientesLimpiarSeleccion: '[clientes] Limpiar selección',
    clientesGuardarCliente: '[clientes] Guardar cliente',

    configuracionTiposIdentificacion: '[configuracion] Buscar tipos de identificacion',
    configuracionDatosEmpresa: '[configuracion] Obtener datos empresa',
    configuracionTiposProducto: '[configuracion] Obtener tipos de producto',
    configuracionTarifasIva: '[configuracion] Obtener tarifas de IVA',
    configuracionFormasPago: '[configuracion] Obtener Formas de Pago',
    configuracionTiposDocumento: '[configuracion] Obtener Tipos Documento',
    configuracionImpuestosRetencion: '[configuracion] Obtener Impuestos Retencion',

    facturaAgregarDetalle: '[factura] Agregar detalle',
    facturaLimpiarFactura: '[factura] Limpiar datos factura',
    facturaAgregarAdicional: '[factura] Agregar Dato Adicional',
    facturaAgregarFormaPago: '[factura] Agregar Forma Pago',
    facturaValoresFactura: '[factura] Agregar Valores Factura',
    facturaActualizarDetalles: '[factura] Actualizar detalles factura',
    facturaActualizarAdicionales: '[factura] Actualizar Datos Adicionales',
    facturaActualizarFormasPago: '[factura] Actualizar Formas Pago',
    facturaObtenerClaveAcceso: '[factura] Obtener clave acceso',
    facturaObtenerPagos: '[factura] Obtener pagos',

    retencionAgregarDetalle: '[retencion] Agregar detalle',
    retencionEliminarDetalle: '[retencion] Eliminar detalle',
    retencionObtenerEmitidas: '[retenciones] Obtener emitidas',
    retencionLimpiar: '[retencion] Limpiar',
    retencionObtenerClaveAcceso: '[retencion] Obtener clave acceso',
    retencionObtenerDetalles: '[retencion] Obtener detalles',

    comprobanteObtenerEmitidos: '[comprobante] Obtener comprobantes emitidos',
    comprobanteObtenerFacturasProcesadas: '[comprobante] Obtener facturas procesadas',
    comprobanteObtenerDetalles: '[comprobante] Obtener detalles comprobante',
    comprobanteIniciarObtenerPdf: '[comprobante] Iniciar Obtener PDF',
    comprobanteTerminarObtenerPdf: '[comprobante] Terminar Obtener PDF',
    comprobanteObtenerFechasBusqueda: '[comprobante] Obtener fechas de búsqueda',
    comprobanteObtenerError: '[comprobante] Obtener error comprobante',
    comprobanteObtenerAutorizacion: '[comprobante] Obtener autorizacion comprobante',
    comprobanteLimpiarAutorizacion: '[comprobante] Limpiar autorizacion comprobante',
    comprobanteLimpiarError: '[comprobante] Limpiar error comprobante',
    comprobanteIniciarReenvioMail: '[comprobante] Iniciar reenvio mail',
    comprobanteTerminarReenvioMail: '[comprobante] Terminar reenvio mail',
    comprobantePresentarReprocesar: '[comprobante] Presentar reprocesar',
    comprobanteOcultarReprocesar: '[comprobante] Ocultar reprocesar',
    comprobantePresentarAnular: '[comprobante] Presentar anular',
    comprobanteOcultarAnular: '[comprobante] Ocultar anular',
    comprobanteActualizarComprobantes: '[comprobante] Actualizar comprobantes',

    notaCreditoAgregarDetalle: '[notaCredito] Agregar detalle',
    notaCreditoEliminarDetalle: '[notaCredito] Eliminar detalle',
    notaCreditoLimpiar: '[notaCredito] Limpiar',
    notaCreditoAgregarValores: '[notaCredito] Agregar valores',
    notaCreditoObtenerEmitidas: '[notaCredito] Obtener emitidas',
    notaCreditoObtenerClaveAcceso: '[notaCredito] Obtener clave acceso',

    uiMostrarCargando: '[ui] Mostrar Cargando',
    uiOcultarCargando: '[ui] Ocultar Cargando'
}