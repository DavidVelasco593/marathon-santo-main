// @ts-ignore
import React, { useRef } from 'react';
// @ts-ignore
import ReCAPTCHA from 'react-google-recaptcha';
import { createUser } from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import { validationSchema } from '../utils/validators';

const RegisterForm: React.FC = () => {
  // const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    
    // const recaptchaValue = recaptchaRef.current?.getValue();
    
      try {
        //Descarta los valores que no se necesitan, terms y newsletter
        delete values.terms;
        delete values.newsletter;
        values.birthDate = new Date(values.birthDate).toISOString();
        const response = await createUser(values);
        console.log(response.data);
        toast.success(
          'Su preinscripción a la carrera fue enviada satisfactoriamente'
        );
        resetForm();
        
      } catch (error) {
        console.error(error);
        toast.error('Hubo un error al enviar su preinscripción');
      }
    
  };

  return (
    <div>
      <ToastContainer />
      <div className="max-w-6xl mx-auto p-6">
        <div className="relative w-full h-64 mb-6">
          <img
            src="https://www.lahora.com.ec/wp-content/uploads/2024/04/CARRERA-ATLETICA1.jpg"
            alt="Imagen de la marathon"
            className="object-cover w-full h-full rounded"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">
          FORMULARIO DE PRE-INSCRIPCIÓN
        </h2>
        <h3 className="text-xl font-semibold mb-4">INFORMACIÓN GENERAL</h3>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            identification: '',
            birthDate: '',
            gender: '',
            phone: '',
            nationality: '',
            email: '',
            category: '',
            size: '',
            terms: false,
            newsletter: false,
          }}
          validationSchema={validationSchema}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={handleSubmit}
        >
          {({}) => (
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block mb-1">Nombres</label>
                  <Field
                    name="firstName"
                    className="w-full px-4 py-2 border rounded"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div>
                  <label className="block mb-1">Apellidos</label>
                  <Field
                    name="lastName"
                    className="w-full px-4 py-2 border rounded"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div>
                  <label className="block mb-1">Documento de identidad</label>
                  <Field
                    name="identification"
                    className="w-full px-4 py-2 border rounded"
                  />
                  <ErrorMessage
                    name="identification"
                    component="div"
                    className="text-red-600"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block mb-1">Fecha de Nacimiento</label>
                  <Field
                    name="birthDate"
                    type="date"
                    className="w-full px-4 py-2 border rounded"
                  />
                  <ErrorMessage
                    name="birthDate"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div>
                  <label className="block mb-1">Sexo</label>
                  <Field
                    name="gender"
                    as="select"
                    className="w-full px-4 py-2 border rounded"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="femenino">Femenino</option>
                    <option value="masculino">Masculino</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div>
                  <label className="block mb-1">Teléfono</label>
                  <Field
                    name="phone"
                    type="tel"
                    className="w-full px-4 py-2 border rounded"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div>
                  <label className="block mb-1">Nacionalidad</label>
                  <Field
                    name="nationality"
                    as="select"
                    className="w-full px-4 py-2 border rounded"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Ecuador">Ecuador</option>
                  </Field>
                  <ErrorMessage
                    name="nationality"
                    component="div"
                    className="text-red-600"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Datos de contacto y categoría
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block mb-1">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full px-4 py-2 border rounded"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div>
                  <label className="block mb-1">Categoría</label>
                  <div className="flex gap-4">
                    <label>
                      <Field
                        type="radio"
                        name="category"
                        value="42k"
                        className="mr-2"
                      />{' '}
                      42k $60
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="category"
                        value="21k"
                        className="mr-2"
                      />{' '}
                      21k $45
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="category"
                        value="10k"
                        className="mr-2"
                      />{' '}
                      10k $30
                    </label>
                  </div>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div>
                  <label className="block mb-1">Talla</label>
                  <div className="flex gap-4">
                    <label>
                      <Field
                        type="radio"
                        name="size"
                        value="XS"
                        className="mr-2"
                      />{' '}
                      XS
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="size"
                        value="S"
                        className="mr-2"
                      />{' '}
                      S
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="size"
                        value="M"
                        className="mr-2"
                      />{' '}
                      M
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="size"
                        value="L"
                        className="mr-2"
                      />{' '}
                      L
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="size"
                        value="XL"
                        className="mr-2"
                      />{' '}
                      XL
                    </label>
                  </div>
                  <ErrorMessage
                    name="size"
                    component="div"
                    className="text-red-600"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Términos y condiciones
              </h3>
              <div className="mb-4">
                <Field type="checkbox" name="terms" className="mr-2" />
                <label>Acepto los términos y condiciones</label>
                <ErrorMessage
                  name="terms"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <div className="flex items-center mb-4">
                <Field type="checkbox" name="newsletter" className="mr-2" />
                <label>Deseo recibir información sobre nuevas carreras</label>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-2 rounded"
              >
                Enviar
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
