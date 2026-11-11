# Calendario de Caja y Horarios de Trabajo

Aplicación web para generar calendarios mensuales de cierres de caja o de horarios y horas trabajadas.

## 🎯 Características

- ✅ **Inicialización automática** con el mes y año actual
- 🎨 **Colores por día de la semana** para mejor visualización
- 📅 **Generación dinámica** de calendarios para cualquier mes/año
- 🔄 **Dos tipos de calendario**: cierres de caja y horarios de trabajo
- 🖨️ **Impresión optimizada** en formato A4 landscape
- 📸 **Exportación a imagen** PNG de alta calidad
- 📄 **Exportación a PDF** en formato A4 landscape
- 📝 **Campos específicos por calendario**: datos de caja o horario y total de horas trabajadas

## 📁 Estructura del Proyecto

```
calendario-registro-caja/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos y diseño
├── app.js             # Lógica de la aplicación
└── README.md          # Este archivo
```

## 🚀 Uso

1. **Abrir la aplicación**: Simplemente abre `index.html` en tu navegador web
2. **Visualizar el calendario actual**: Al abrir la página se genera el mes y año actuales. El selector de años ofrece el rango 2000–2030.
3. **Configurar el calendario**: Elige "Cierres de caja" u "Horarios de trabajo". En el segundo modo aparece el campo "Nombre del empleado"; el nombre se muestra en el encabezado del calendario y, si se deja vacío, se imprime una línea en blanco para completarlo después.
4. **Elegir mes y año**: Después de cambiar estos selectores, haz clic en "Generar". El cambio de tipo de calendario y la escritura del nombre actualizan el calendario automáticamente.
5. **Completar el registro**: Los campos diarios son líneas punteadas para completar manualmente. La aplicación no captura ni guarda las horas o datos de caja ingresados en esas líneas; solo el nombre del empleado se puede escribir en la página, y no se conserva al volver a cargarla.
6. **Imprimir o exportar**: Haz clic en "Imprimir", "Guardar imagen" o "Exportar a PDF" para obtener el calendario.

## 🎨 Colores por Día de la Semana

Cada día de la semana tiene un color distintivo:

- 🔴 **Lunes**: Rojo claro
- 🟠 **Martes**: Naranja claro
- 🟡 **Miércoles**: Amarillo verdoso
- 🟢 **Jueves**: Verde claro
- 🔵 **Viernes**: Turquesa
- 🔷 **Sábado**: Azul claro
- 🟣 **Domingo**: Violeta

## 💻 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos y responsive
- **JavaScript ES6+**: Lógica con programación orientada a objetos
- **html2canvas**: Captura de pantalla para exportación
- **jsPDF**: Generación de archivos PDF
- **Google Fonts**: Tipografía Montserrat

## 🔧 Requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexión a internet (para cargar fuentes y librerías externas)

## 📝 Campos de Registro

En el modo **Cierres de caja**, cada día incluye:

1. **Turno**: Para registrar el turno de trabajo
2. **Cant. horas**: Cantidad de horas trabajadas
3. **Caja inicial**: Monto inicial en caja
4. **Efectivo**: Movimientos en efectivo
5. **Virtual**: Movimientos virtuales/electrónicos

En el modo **Horarios de trabajo**, el calendario muestra el nombre del empleado en el encabezado (o una línea en blanco si no se escribió). Cada día incluye:

1. **Horarios**: Horario trabajado
2. **Tot. horas**: Total de horas trabajadas

Estos campos son líneas en blanco para completar a mano; no son campos de entrada ni se almacenan en la aplicación. Para guardar el registro completado, imprime el calendario o exporta una imagen o PDF.

## 🖨️ Impresión

La aplicación está optimizada para impresión en formato **A4 landscape** (horizontal):

- Los colores se preservan en la impresión
- Solo se imprime el calendario (sin controles)
- Márgenes optimizados de 10mm
- Ajuste automático al tamaño de página

## 📤 Exportación

Las opciones **Guardar imagen** y **Exportar a PDF** descargan el calendario que se muestra. Antes de exportar, haz clic en "Generar" si cambiaste el mes o el año; el nombre del archivo usa los valores actuales de esos selectores:

- Cierres de caja: `Calendario_Cierres_de_Caja_AÑO_MES.png` o `.pdf`
- Horarios de trabajo: `Calendario_Horarios_AÑO_MES.png` o `.pdf`

La imagen PNG se genera a doble escala. El PDF se crea en formato A4 horizontal.

## 📦 Dependencias Externas

Las siguientes librerías se cargan desde CDN:

- [html2canvas](https://html2canvas.hertzen.com/) v1.4.1
- [jsPDF](https://github.com/parallax/jsPDF) v2.5.1
- [Google Fonts - Montserrat](https://fonts.google.com/specimen/Montserrat)

## 🔄 Historial de Cambios

### Versión 2.0 (Actual)
- ✅ Separación de código en archivos HTML, CSS y JavaScript
- ✅ Inicialización automática con mes y año actual
- ✅ Arquitectura orientada a objetos
- ✅ Manejo de errores mejorado
- ✅ Mejor experiencia de usuario

### Versión 1.0
- Calendario básico con todo el código en un solo archivo
- Valores hardcodeados para mes y año inicial

## 👨‍💻 Desarrollo

### Arquitectura del Código

El código JavaScript está organizado en una clase `CalendarApp` con los siguientes métodos principales:

- `init()`: Inicializa la aplicación
- `getCurrentDate()`: Obtiene la fecha actual del sistema
- `populateControls()`: Puebla los selectores de mes y año
- `generateCalendar()`: Genera el calendario para un mes/año específico
- `handlePrint()`: Maneja la impresión
- `handleSaveImage()`: Exporta a imagen PNG
- `handleExportPDF()`: Exporta a PDF

### Personalización

Para personalizar los campos de registro, edita el método `buildDayCell()` en `app.js`:

```javascript
buildDayCell(day) {
    return `<td>
        <div class="day-number">${day}</div>
        <div class="line"><span class="label">Tu campo:</span><span class="dots"></span></div>
        // Agrega más campos aquí
    </td>`;
}
```

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y comercial.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si encuentras algún error o tienes sugerencias de mejora, no dudes en reportarlo.

---

**Desarrollado con ❤️ para facilitar el registro de caja diario**
