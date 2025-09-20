interface User {
  id: string;
  firstName: string;
  lastName: string;
  identification: string;
  birthDate: Date;
  gender: string;
  phone: string;
  nationality: string;
  email: string;
  category: string;
  size: string;
  application_status: string;
}

interface ConvertedUser {
  id: string;
  nombres: string;
  apellidos: string;
  cedula: string;
  fechaNacimiento: string;
  sexo: string;
  telefono: string;
  nacionalidad: string;
  email: string;
  categoria: string;
  talla: string;
  status: string;

}

const convertUserData = (user: User): ConvertedUser => ({
  id: user.id,
  nombres: user.firstName,
  apellidos: user.lastName,
  cedula: user.identification,
  fechaNacimiento: new Date(user.birthDate).toLocaleDateString(),
  sexo: user.gender,
  telefono: user.phone,
  nacionalidad: user.nationality,
  email: user.email,
  categoria: user.category,
  talla: user.size,
  status: user.application_status,
});


export type { User, ConvertedUser };
export { convertUserData };