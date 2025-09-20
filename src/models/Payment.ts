// types.ts o el archivo donde defines tus tipos

interface Payment {
  id: string;
  paymentDate: string; // Usar string si las fechas se reciben en formato ISO
  status: string;
  userId: string;
  url: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    identification: string;
  };
}

interface ConvertedPayment {
  id: string;
  fechaPago: string; // Fecha de pago
  estado: string; // Estado del pago
  idUsuario: string;
  urlComprobante: string;
  usuario: {
    nombres: string;
    apellidos: string;
    correo: string;
    cedula: string;
  };
}

export const convertPaymentData = (payment: Payment): ConvertedPayment => ({
  id: payment.id,
  fechaPago: new Date(payment.paymentDate).toLocaleDateString(), // Convertir la fecha
  estado: payment.status,
  idUsuario: payment.userId,
  urlComprobante: payment.url,
  usuario: {
    nombres: payment.user.firstName,
    apellidos: payment.user.lastName,
    correo: payment.user.email,
    cedula: payment.user.identification,
  },
});

export type { Payment, ConvertedPayment };
