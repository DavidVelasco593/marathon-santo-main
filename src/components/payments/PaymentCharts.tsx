import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useMemo } from 'react';
import { ConvertedPayment } from '../../models/Payment';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface PaymentChartsProps {
  payments: ConvertedPayment[];
}

const PaymentCharts: React.FC<PaymentChartsProps> = ({ payments }) => {
  // Define the PaymentStatus type
  type PaymentStatus = 'Pendiente' | 'Aprobado' | 'Rechazado';

  // Create an object with the status counts
  const chartData = useMemo(() => {
    const statusCounts: Record<PaymentStatus, number> = {
      Pendiente: 0,
      Aprobado: 0,
      Rechazado: 0,
    };

    payments.forEach((payment) => {
      const status = payment.estado as PaymentStatus; // Assert the type here
      if (statusCounts.hasOwnProperty(status)) {
        statusCounts[status]++;
      }
    });

    return {
      labels: ['Pendiente', 'Aprobado', 'Rechazado'],
      datasets: [
        {
          label: 'Cantidad de Pagos por Estado',
          data: [
            statusCounts.Pendiente,
            statusCounts.Aprobado,
            statusCounts.Rechazado,
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, [payments]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default PaymentCharts;
