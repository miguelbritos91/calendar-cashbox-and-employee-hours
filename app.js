/**
 * CALENDARIO DE REGISTRO DE CAJA
 * Aplicación para generar calendarios mensuales con campos de registro
 */

class CalendarApp {
    constructor() {
        // Configuración
        this.MONTH_NAMES = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        this.DAY_NAMES = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'];
        this.YEAR_RANGE = { start: 2000, end: 2030 };

        // Referencias al DOM
        this.elements = {
            employeeNameField: document.getElementById('employeeNameField'),
            employeeName: document.getElementById('employeeName'),
            calendarTypeSelect: document.getElementById('calendarTypeSelect'),
            calendarTitle: document.getElementById('calendarTitle'),
            monthSelect: document.getElementById('monthSelect'),
            yearSelect: document.getElementById('yearSelect'),
            btnGenerate: document.getElementById('btnGenerate'),
            btnPrint: document.getElementById('btnPrint'),
            btnSaveImg: document.getElementById('btnSaveImg'),
            btnPDF: document.getElementById('btnPDF'),
            container: document.getElementById('calendarContainer')
        };

        // Inicializar
        this.init();
    }

    /**
     * Inicializa la aplicación
     */
    init() {
        this.populateControls();
        this.updateEmployeeNameVisibility();
        this.attachEventListeners();
        this.generateCurrentMonthCalendar();
    }

    /**
     * Obtiene la fecha actual del sistema
     */
    getCurrentDate() {
        const now = new Date();
        return {
            month: now.getMonth(), // 0-11
            year: now.getFullYear()
        };
    }

    /**
     * Puebla los selectores de mes y año
     */
    populateControls() {
        // Poblar meses
        this.MONTH_NAMES.forEach((monthName, index) => {
            const option = new Option(monthName, index);
            this.elements.monthSelect.add(option);
        });

        // Poblar años
        for (let year = this.YEAR_RANGE.start; year <= this.YEAR_RANGE.end; year++) {
            this.elements.yearSelect.add(new Option(year, year));
        }

        // Seleccionar mes y año actual
        const currentDate = this.getCurrentDate();
        this.elements.monthSelect.value = currentDate.month;
        this.elements.yearSelect.value = currentDate.year;
    }

    /**
     * Adjunta los event listeners a los botones
     */
    attachEventListeners() {
        this.elements.btnGenerate.addEventListener('click', () => this.handleGenerate());
        this.elements.calendarTypeSelect.addEventListener('change', () => {
            this.updateEmployeeNameVisibility();
            this.handleGenerate();
        });
        this.elements.employeeName.addEventListener('input', () => this.handleGenerate());
        this.elements.btnPrint.addEventListener('click', () => this.handlePrint());
        this.elements.btnSaveImg.addEventListener('click', () => this.handleSaveImage());
        this.elements.btnPDF.addEventListener('click', () => this.handleExportPDF());
    }

    /**
     * Genera el calendario para el mes y año actual
     */
    generateCurrentMonthCalendar() {
        const currentDate = this.getCurrentDate();
        this.generateCalendar(currentDate.month, currentDate.year);
    }

    /**
     * Maneja el evento de generar calendario
     */
    handleGenerate() {
        const month = parseInt(this.elements.monthSelect.value, 10);
        const year = parseInt(this.elements.yearSelect.value, 10);
        this.generateCalendar(month, year);
    }

    updateEmployeeNameVisibility() {
        this.elements.employeeNameField.hidden = this.elements.calendarTypeSelect.value !== 'work-hours';
    }

    /**
     * Genera la tabla del calendario para un mes y año específicos
     * @param {number} month - Mes (0-11)
     * @param {number} year - Año
     */
    generateCalendar(month, year) {
        try {
            // Validar parámetros
            if (month < 0 || month > 11 || !year) {
                throw new Error('Mes o año inválido');
            }

            const config = this.getCalendarConfig();
            this.elements.calendarTitle.textContent = config.title;

            // Construir HTML de la tabla
            let html = this.buildCalendarMeta(month, year);
            html += this.buildCalendarHeader();
            html += this.buildCalendarBody(month, year);
            html += '</tbody></table>';

            // Insertar en el contenedor
            this.elements.container.innerHTML = html;
        } catch (error) {
            console.error('Error al generar calendario:', error);
            this.elements.container.innerHTML = `<p style="color: red;">Error al generar el calendario: ${error.message}</p>`;
        }
    }

    /**
     * Construye el encabezado de la tabla del calendario
     */
    buildCalendarHeader() {
        let html = '<table class="calendar"><thead><tr>';
        this.DAY_NAMES.forEach(dayName => {
            html += `<th>${dayName}</th>`;
        });
        html += '</tr></thead><tbody>';
        return html;
    }

    buildCalendarMeta(month, year) {
        const employeeName = this.elements.employeeName.value.trim();
        const monthAndYear = `${this.MONTH_NAMES[month]} ${year}`;

        if (this.elements.calendarTypeSelect.value === 'work-hours') {
            const employeeDisplay = employeeName ? this.escapeHtml(employeeName) : '________________';
            return `<h3 class="calendar-meta">${employeeDisplay} - ${monthAndYear}</h3>`;
        }

        return `<h3 class="calendar-meta">${monthAndYear}</h3>`;
    }

    escapeHtml(value) {
        return value.replace(/[&<>"']/g, character => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[character]);
    }

    /**
     * Construye el cuerpo de la tabla del calendario
     * @param {number} month - Mes (0-11)
     * @param {number} year - Año
     */
    buildCalendarBody(month, year) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        // Transformar día de la semana: JS usa 0=Dom, necesitamos 0=Lun
        const startWeekday = (firstDay.getDay() + 6) % 7;
        const totalDays = lastDay.getDate();

        let html = '';
        let day = 1;

        // Generar hasta 6 semanas (máximo posible)
        for (let week = 0; week < 6; week++) {
            html += '<tr>';
            
            for (let dow = 0; dow < 7; dow++) {
                if ((week === 0 && dow < startWeekday) || day > totalDays) {
                    // Celda vacía
                    html += '<td class="empty"></td>';
                } else {
                    // Celda con día
                    html += this.buildDayCell(day);
                    day++;
                }
            }
            
            html += '</tr>';
            
            // Si ya pasamos todos los días, salir del loop
            if (day > totalDays) break;
        }

        return html;
    }

    /**
     * Construye una celda de día con sus campos
     * @param {number} day - Número del día
     */
    buildDayCell(day) {
        const fields = this.getCalendarConfig().fields;
        return `<td>
            <div class="day-number">${day}</div>
            ${fields.map(field => `<div class="line"><span class="label">${field}</span><span class="dots"></span></div>`).join('')}
        </td>`;
    }

    getCalendarConfig() {
        if (this.elements.calendarTypeSelect.value === 'work-hours') {
            return {
                title: 'Calendario de Horarios de Trabajo',
                filePrefix: 'Calendario_Horarios',
                fields: ['Horarios:', 'Tot. horas:']
            };
        }

        return {
            title: 'Calendario de Registro de Caja',
            filePrefix: 'Calendario_Cierres_de_Caja',
            fields: ['Turno:', 'Cant. horas:', 'Caja inicial:', 'Efectivo:', 'Virtual:']
        };
    }

    /**
     * Maneja la impresión del calendario
     */
    handlePrint() {
        window.print();
    }

    /**
     * Maneja la exportación a imagen PNG
     */
    async handleSaveImage() {
        if (!this.checkHtml2Canvas()) return;

        try {
            this.disableButtons(true);
            
            const canvas = await html2canvas(this.elements.container, { scale: 2 });
            
            canvas.toBlob(blob => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = this.getFileName('png');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                
                this.disableButtons(false);
            });
        } catch (error) {
            console.error('Error al guardar imagen:', error);
            alert('Error al guardar la imagen. Por favor, intenta nuevamente.');
            this.disableButtons(false);
        }
    }

    /**
     * Maneja la exportación a PDF
     */
    async handleExportPDF() {
        if (!this.checkHtml2Canvas() || !this.checkJsPDF()) return;

        try {
            this.disableButtons(true);
            
            const canvas = await html2canvas(this.elements.container, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({ 
                orientation: 'landscape', 
                unit: 'mm', 
                format: 'a4' 
            });
            
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgProps = pdf.getImageProperties(imgData);
            const imgWidth = pageWidth;
            const imgHeight = (imgProps.height * pageWidth) / imgProps.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(this.getFileName('pdf'));
            
            this.disableButtons(false);
        } catch (error) {
            console.error('Error al exportar PDF:', error);
            alert('Error al exportar el PDF. Por favor, intenta nuevamente.');
            this.disableButtons(false);
        }
    }

    /**
     * Genera el nombre de archivo para descargas
     * @param {string} extension - Extensión del archivo
     */
    getFileName(extension) {
        const month = this.MONTH_NAMES[this.elements.monthSelect.value];
        const year = this.elements.yearSelect.value;
        return `${this.getCalendarConfig().filePrefix}_${year}_${month}.${extension}`;
    }

    /**
     * Habilita o deshabilita los botones
     * @param {boolean} disabled - true para deshabilitar, false para habilitar
     */
    disableButtons(disabled) {
        this.elements.btnGenerate.disabled = disabled;
        this.elements.btnPrint.disabled = disabled;
        this.elements.btnSaveImg.disabled = disabled;
        this.elements.btnPDF.disabled = disabled;
    }

    /**
     * Verifica si html2canvas está disponible
     */
    checkHtml2Canvas() {
        if (typeof html2canvas === 'undefined') {
            alert('Error: La librería html2canvas no se cargó correctamente.');
            return false;
        }
        return true;
    }

    /**
     * Verifica si jsPDF está disponible
     */
    checkJsPDF() {
        if (typeof window.jspdf === 'undefined') {
            alert('Error: La librería jsPDF no se cargó correctamente.');
            return false;
        }
        return true;
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new CalendarApp();
});
