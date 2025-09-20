import React from 'react';

const Info: React.FC = () => {
  return (
    <div className="font-sans text-gray-800 bg-gray-100">
      <div className="max-w-2xl mx-auto bg-cover bg-center text-white text-center p-16 rounded-lg shadow-lg" style={{ backgroundImage: "url('https://www.lahora.com.ec/wp-content/uploads/2024/04/CARRERA-ATLETICA1.jpg')" }}>
        <h1 className="text-4xl font-bold mb-4 text-shadow-md">Maratón Santo Domingo 2024</h1>
        <p className="bg-blue-800 bg-opacity-80 inline-block py-2 px-4 rounded-md mt-4">¡Bienvenidos a la maratón más emocionante de Santo Domingo!</p>
      </div>

      <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">Información General</h2>
        <p className="mb-6">
          La Maratón de Santo Domingo es un evento anual que reúne a corredores de todas las edades y niveles para celebrar el espíritu del deporte y la comunidad. Este año, el evento tendrá lugar el <strong>15 de octubre de 2024</strong>, comenzando a las 7:00 AM en el Parque Central de Santo Domingo.
        </p>
        
        <h3 className="text-xl font-bold text-blue-700 text-center mb-4">Distancias y Categorías</h3>
        <ul className="list-disc list-inside mb-6">
          <li><strong>42k</strong> - Maratón completo. Requiere un nivel avanzado de preparación física.</li>
          <li><strong>21k</strong> - Media maratón. Ideal para corredores con experiencia moderada.</li>
          <li><strong>10k</strong> - Carrera corta. Perfecta para principiantes y corredores recreativos.</li>
        </ul>

        <h3 className="text-xl font-bold text-blue-700 text-center mb-4">Inscripciones</h3>
        <p className="mb-6">
          Las inscripciones están abiertas hasta el <strong>30 de septiembre de 2024</strong>. ¡Asegúrate de registrar tu participación cuanto antes!
        </p>

        <h3 className="text-xl font-bold text-blue-700 text-center mb-4">Beneficios para los Participantes</h3>
        <ul className="list-disc list-inside mb-6">
          <li>Camiseta oficial del evento</li>
          <li>Medalla conmemorativa al cruzar la meta</li>
          <li>Abastecimiento en puntos de hidratación a lo largo del recorrido</li>
          <li>Servicio de asistencia médica en caso de emergencias</li>
        </ul>

        <h3 className="text-xl font-bold text-blue-700 text-center mb-4">Recomendaciones</h3>
        <p className="mb-6">
          Para una experiencia segura y agradable, se recomienda a todos los participantes:
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>Realizar un chequeo médico previo al evento</li>
          <li>Hidratarse adecuadamente antes, durante y después de la carrera</li>
          <li>Usar ropa y calzado adecuado para correr</li>
          <li>Respetar las indicaciones de los organizadores y el personal de seguridad</li>
        </ul>
      </div>
    </div>
  );
};

export default Info;