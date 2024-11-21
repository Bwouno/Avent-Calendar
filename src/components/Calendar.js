import React, { useState } from "react";
import "./Calendar.css";
import { motion } from "framer-motion";

// Création d'un tableau de codes promo différents pour chaque jour
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
]; // Codes promo pour chaque jour de novembre

const days = Array.from({ length: 24 }, (_, i) => i + 1); // 24 jours pour tester en novembre

const Calendar = () => {
  const [openedDays, setOpenedDays] = useState([]);
  const [giftCode, setGiftCode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentDate = new Date();
  const today =
    currentDate.getMonth() === 11 && currentDate.getDate() <= 24
      ? currentDate.getDate()
      : null; // On récupère le jour actuel uniquement si nous sommes en novembre

  const handleOpenDay = (day) => {
    if (day === today && !openedDays.includes(day)) {
      // Seule la case du jour actuel peut être ouverte
      setOpenedDays([...openedDays, day]);
      setGiftCode(promoCodes[day - 1]); // On récupère le code promo du jour
      setIsModalOpen(true); // Ouvre la popup
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Ferme la popup
  };

  return (
    currentDate.getMonth() === 11 ?
    <div className="calendar">
      {days.map((day) => {
        // Afficher les jours passés sans code promo
        if (today && day < today) {
          return (
            <motion.div key={day} className="calendar-day past">
              <span>{day}</span>
            </motion.div>
          );
        }

        // Pour les jours actuels et suivants
        return (
          <motion.div
            key={day}
            className={`calendar-day ${
              day === today ? "today" : day > today ? "future" : ""
            }`}
            onClick={() => day === today && handleOpenDay(day)} // Seul le jour actuel est cliquable
            whileHover={
              day === today && !openedDays.includes(day)
                ? { backgroundColor: "#e76f51", scale: 1.1 }
                : {}
            }
            whileTap={
              day === today && !openedDays.includes(day) ? { scale: 0.9 } : {}
            }
          >
            {openedDays.includes(day) ? (
              <motion.div
                className="surprise"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  Code Promo:{" "}
                  <strong style={{ color: "white", fontSize: "13px" }}>
                    {giftCode}
                  </strong>
                </p>
              </motion.div>
            ) : (
              <span>{day}</span>
            )}
          </motion.div>
        );
      })}

      {/* Popup modale */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>🎅🏻 Ho! Ho! Ho!</h2>
            <p>
              Pour connaître votre cadeau, voici votre <br /> <br />
              Code Promo: <strong>{giftCode}</strong>
              <br />
              <br /> Valable uniquement aujourd'hui sur votre commande
            </p>
            <button onClick={closeModal}>Fermer</button>
          </div>
        </div>
      )}
    </div>
    :
    <div className="event">
      <p>Votre Calendrier de l'Avent sera bientôt disponible.<br/> Revenez le 1er décembre pour ouvrir la première case</p>
    </div>
  );
};

export default Calendar;
