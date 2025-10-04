import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ChipProps,
} from '@nextui-org/react';
import { useEffect, useState, useCallback } from 'react';

import { getPayments, updatePayment } from '../services/api';
import { ConvertedPayment } from '../models/Payment';

export default function Payments() {
  const [payments, setPayments] = useState<ConvertedPayment[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const statusColorMap: Record<string, ChipProps['color']> = {
    Pendiente: 'warning',
    Aprobado: 'success',
    Rechazado: 'danger',
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getPayments();
        setPayments(data);
        console.log('Payments:', data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  const handleAccept = async (id: any) => {
    try {
      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment.id === id ? { ...payment, estado: 'Aprobado' } : payment
        )
      );
      await updatePayment(id, { status: 'Aprobado' });
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const handleReject = async (id: any) => {
    try {
      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment.id === id ? { ...payment, estado: 'Rechazado' } : payment
        )
      );
      await updatePayment(id, { status: 'Rechazado' });
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const renderCell = useCallback(
    (
      payment: { [x: string]: any; usuario: { nombres: any; apellidos: any } },
      columnKey: string | number
    ) => {
      const cellValue = payment[columnKey];

      switch (columnKey) {
        case 'usuario':
          return `${payment.usuario.nombres} ${payment.usuario.apellidos}`;
        case 'estado':
          return (
            <Chip color={statusColorMap[cellValue] || 'default'}>{cellValue}</Chip>
          );
        case 'fechaPago':
          return cellValue;
        case 'comprobante':
          return (
            <Button onPress={() => handleImageClick(payment.urlComprobante)}>
              Ver Comprobante
            </Button>
          );
        case 'actions':
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Button
                isIconOnly
                size="sm"
                color="success"
                variant="light"
                onPress={() => handleAccept(payment.id)}
              >
                ✓
              </Button>
              <Button
                isIconOnly
                size="sm"
                color="danger"
                variant="light"
                onPress={() => handleReject(payment.id)}
              >
                ✕
              </Button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <>
      <Table aria-label="Payments table">
        <TableHeader>
          <TableColumn>Usuario</TableColumn>
          <TableColumn>Cédula</TableColumn>
          <TableColumn>Correo</TableColumn>
          <TableColumn>Fecha de Pago</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn>Comprobante</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody items={payments}>
          {(payment) => (
            <TableRow key={payment.id}>
              <TableCell>{renderCell(payment, 'usuario')}</TableCell>
              <TableCell>{payment.usuario.cedula}</TableCell>
              <TableCell>{payment.usuario.correo}</TableCell>
              <TableCell>{payment.fechaPago}</TableCell>
              <TableCell>{renderCell(payment, 'estado')}</TableCell>
              <TableCell>{renderCell(payment, 'comprobante')}</TableCell>
              <TableCell>{renderCell(payment, 'actions')}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedImage && (
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <ModalContent>
            <ModalHeader>
              <h2>Vista previa del comprobante</h2>
            </ModalHeader>
            <ModalBody>
              <img
                src={selectedImage}
                alt="Vista previa del comprobante"
                className="rounded-lg shadow-md w-full h-auto"
              />
            </ModalBody>
            <ModalFooter>
              <Button onPress={() => setModalVisible(false)}>Cerrar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
