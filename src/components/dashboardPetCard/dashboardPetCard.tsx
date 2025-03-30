import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pet, User } from "../../types/";
import { FaCat, FaTrashAlt, FaRegEdit } from "react-icons/fa";

import Modal from "../modal/modal";

import styles from './dashboardPetCard.module.css';
import Button from 'components/button/button';
import PetForm from 'components/petForm/petForm';
import HighlightText from 'components/highlightText/highlightText';

interface DashboardPetCardProps {
  user: User
  isProfile?: boolean
}

const DashboardPetCard: React.FC<DashboardPetCardProps> = ({ user, isProfile = false }) => {

  const [isOpen, setIsOpen] = useState(false);

  const allPets = [...user.pets, ...(user.family?.users.flatMap(user => user.pets) || [])];

  const attachPet = (pet: Pet, tutorId: string) => {
    if (tutorId === user.tutorId) {
      user.pets.push(pet);
    } else {
      user.family?.users.forEach(user => {
        if (user.tutorId === tutorId) {
          user.pets.push(pet);
        }
      });
    }
  }

  return (
    <div className={styles.petMain}>

      <HighlightText type='secondary'>Meus Pets</HighlightText>

      <div className={styles.petCards}>

        { ( allPets && allPets.map((Pet) => (
          <div className={styles.buttonBox} key={Pet.id}>
            <Button type='secondary' onclick={() => console.log('Pet', Pet)}>
                <Link to={`/pet/${Pet.id}`}>
                  <h2>{ Pet.name } <FaCat /></h2>
                </Link>
            </Button>
            {isProfile && <div className={styles.buttonOptions}>
              <Button type='circleDark' className={styles.closeButton} onclick={() => console.log('Fechar')}>
                <FaTrashAlt />
              </Button>
              <Button type='circleDark' className={styles.closeButton} onclick={() => console.log('Fechar')}>
                <FaRegEdit />
              </Button>
            </div>}
          </div>
        )) ) }

      </div>

      <Button onclick={() => setIsOpen(true)} type='primary'>Adicionar Pet</Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <PetForm user={user} onclose={() => setIsOpen(false)} setnewpet={attachPet} />
      </Modal>

    </div>
  );
};

export default DashboardPetCard;