import React, { useState } from "react";
import "./Calendar.css";
import { motion } from "framer-motion";

// Composant Snow pour gérer les flocons de neige
const Snow = () => {
  return (
    <div className="snow">
      <div className="snowflake"></div>
      <div className="snowflake"></div>
      {/* Ajoutez autant de flocons de neige que nécessaire */}
    </div>
  );
};

const promoCodes = [
  "NOEL01",
  "NOEL02",
  "NOEL03",
  "NOEL04",
  "NOEL05",
  "NOEL06",
  "NOEL07",
  "NOEL08",
  "NOEL09",
  "NOEL10",
  "NOEL11",
  "NOEL12",
  "NOEL13",
  "NOEL14",
  "NOEL15",
  "NOEL16",
  "NOEL17",
  "NOEL18",
  "NOEL19",
  "NOEL20",
  "NOEL21",
  "NOEL22",
  "NOEL23",
  "NOEL24",
  "NOEL25",
]

const days = Array.from({ length: 24 }, (_, i) => i + 1); // 24 jours pour tester en novembre


const Calendar = () => {
  const [openedDays, setOpenedDays] = useState([]);
  const [giftCode, setGiftCode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentDate = new Date();
  const today =
    currentDate.getMonth() === 11 && currentDate.getDate() <= 24
      ? currentDate.getDate()
      : null;

  const handleOpenDay = (day) => {
    if (day === today && !openedDays.includes(day)) {
      setOpenedDays([...openedDays, day]);
      setGiftCode(promoCodes[day - 1]);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openGrooming = () => {
    window.open("https://grooming-access.com/fr/", "_blank");
  };

  return (
    <div className="calendar-container">
      {/* Neige en fond */}
      <Snow />

      {/* Calendrier de l'avent */}
      <div className="calendar">
      {currentDate.getMonth() === 11 ?
        days.map((day) => {
          if (today && day < today) {
            return (
              <motion.div key={day} className="calendar-day past">
                <span>{day}</span>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={day}
              className={`calendar-day ${
                day === today ? "today" : day > today ? "future" : ""
              }`}
              onClick={() => day === today && handleOpenDay(day)}
            >
              {openedDays.includes(day) ? (
                <motion.div className="surprise" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p>
                    Code Promo: <strong>{giftCode}</strong>
                  </p>
                </motion.div>
              ) : (
                <span>{day}</span>
              )}
            </motion.div>
          );
        }) :
        <div className="event">
          <span>Votre Calendrier de l'Avent sera bientôt disponible.
          Revenez le 1er décembre pour ouvrir la première case</span>
        </div>
      }

        {/* Popup modale */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>🎅🏻 Ho! Ho! Ho!</h2>
              <p>
                Pour connaître votre cadeau, voici votre <br />
                Code Promo: <strong>{giftCode}</strong>
                <br />
                Valable uniquement aujourd'hui sur votre commande
              </p>
              <button onClick={closeModal}>Fermer</button>
            </div>
          </div>
        )}
      </div>

      {/* Bouton Google */}
      <button className="open-grooming-button" onClick={openGrooming}>
        Retour sur Grooming Access
      </button>
    </div>
  );
};

export default Calendar;
