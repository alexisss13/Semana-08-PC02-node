document.addEventListener('DOMContentLoaded', function () {
    // --- Lógica para el Modal de Organizadores ---
    const organizadorModalElement = document.getElementById('organizadorModal');
    if (organizadorModalElement) {
        const organizadorModal = new bootstrap.Modal(organizadorModalElement);
        const form = document.getElementById('organizadorForm');
        const modalTitle = document.getElementById('organizadorModalLabel');
        const nombreInput = document.getElementById('nombre');
        const telefonoInput = document.getElementById('telefono');
        const submitButton = form.querySelector('button[type="submit"]');

        // Abrir modal para CREAR un nuevo organizador
        const createOrganizadorBtn = document.getElementById('createOrganizadorBtn');
        if (createOrganizadorBtn) {
            createOrganizadorBtn.addEventListener('click', function () {
                form.action = '/organizadores/crear';
                modalTitle.textContent = 'Crear Nuevo Organizador';
                submitButton.textContent = 'Guardar';
                form.reset(); // Limpia el formulario
                organizadorModal.show();
            });
        }

        // Abrir modal para EDITAR un organizador existente
        document.querySelectorAll('.edit-organizador-btn').forEach(button => {
            button.addEventListener('click', function () {
                const id = this.dataset.id;
                const nombre = this.dataset.nombre;
                const telefono = this.dataset.telefono;

                form.action = `/organizadores/editar/${id}`;
                modalTitle.textContent = 'Editar Organizador';
                submitButton.textContent = 'Actualizar';

                nombreInput.value = nombre;
                telefonoInput.value = telefono;

                organizadorModal.show();
            });
        });
    }

    // --- Lógica para Notificaciones con SweetAlert2 ---
    const urlParams = new URLSearchParams(window.location.search);
    const successAction = urlParams.get('success');

    if (successAction) {
        let title = '';
        switch (successAction) {
            case 'create':
                title = '¡Registro Creado!';
                break;
            case 'update':
                title = '¡Registro Actualizado!';
                break;
            case 'delete':
                title = '¡Registro Eliminado!';
                break;
            default:
                title = '¡Operación Exitosa!';
        }

        Swal.fire({
            title: title,
            text: 'La operación se completó correctamente.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
        });
    }
});
