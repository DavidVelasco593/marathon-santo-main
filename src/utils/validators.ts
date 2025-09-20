import dayjs from 'dayjs';
import * as Yup from 'yup';

const isValidCI = (ci: string) => {
  var isNumeric = true;
  var total = 0,
    individual;

  for (var position = 0; position < 10; position++) {
    individual = ci.toString().substring(position, position + 1);

    if (isNaN(parseInt(individual))) {
      isNumeric = false;
      break;
    } else {
      if (position < 9) {
        if (position % 2 === 0) {
          if (parseInt(individual) * 2 > 9) {
            total += 1 + ((parseInt(individual) * 2) % 10);
          } else {
            total += parseInt(individual) * 2;
          }
        } else {
          total += parseInt(individual);
        }
      }
    }
  }

  if (total % 10 !== 0) {
    total = total - (total % 10) + 10 - total;
  } else {
    total = 0;
  }

  if (isNumeric) {
    if (ci.toString().length !== 10) {
      return false;
    }

    if (parseInt(ci, 10) === 0) {
      return false;
    }

    if (total !== parseInt(individual ?? '')) {
      return false;
    }

    return true;
  }

  return false;
};


const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Nombre muy corto')
    .max(50, 'Nombre muy largo')
    .required('Nombre requerido'),
  lastName: Yup.string()
    .min(2, 'Apellido muy corto')
    .max(50, 'Apellido muy largo')
    .required('Apellido requerido'),
  identification: Yup.string()
    .required('Documento de identidad requerido')
    .test('isValidCI', 'Cédula ingresada no es válida', (value) =>
      isValidCI(value)
    ),
  birthDate: Yup.date()
    .max(dayjs().subtract(18, 'years').toDate(), 'Debe ser mayor de 18 años')
    .required('Fecha de nacimiento requerida'),
  gender: Yup.string().required('Sexo requerido'),
  phone: Yup.string()
    .matches(/^09\d{8}$/, 'El teléfono debe comenzar con 09 y tener 10 dígitos')
    .required('Teléfono requerido'),
  nationality: Yup.string().required('Nacionalidad requerida'),
  email: Yup.string().email('Email inválido').required('Email requerido'),
  category: Yup.string().required('Categoría requerida'),
  size: Yup.string().required('Talla requerida'),
  terms: Yup.bool().oneOf([true], 'Debes aceptar los términos y condiciones'),
  newsletter: Yup.bool(),
});

export { isValidCI, validationSchema };