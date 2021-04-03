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

    facturaAgregarDetalle: '[factura] Agregar detalle',
    facturaLimpiarFactura: '[factura] Limpiar datos factura',
    facturaAgregarAdicional: '[factura] Agregar Dato Adicional',
    facturaAgregarFormaPago: '[factura] Agregar Forma Pago',
    facturaValoresFactura: '[factura] Agregar Valores Factura',
    facturaActualizarDetalles: '[factura] Actualizar detalles factura',
    facturaActualizarAdicionales: '[factura] Actualizar Datos Adicionales',
    facturaActualizarFormasPago: '[factura] Actualizar Formas Pago',

    comprobanteObtenerEmitidos: '[comprobante] Obtener comprobantes emitidos',
    comprobanteIniciarObtenerPdf: '[comprobante] Iniciar Obtener PDF',
    comprobanteTerminarObtenerPdf: '[comprobante] Terminar Obtener PDF',
    comprobanteObtenerFechasBusqueda: '[comprobante] Obtener fechas de búsqueda',
}