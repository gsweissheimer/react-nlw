import React, { use, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pet, User } from "../../types/";
import { usePet } from '../../hooks/usePet';
import { FaDog, FaCat, FaTrashAlt, FaRegEdit } from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify';

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

  const { Pets, SetPets, deletePet } = usePet();

  const [editPet, setEditPet] = useState<Pet | null>(null);

  useEffect(() => {
    console.log('Pets', Pets)
    if (Pets.length === 0) {
      SetPets([...user.pets, ...(user.family?.users.flatMap(user => user.pets) || [])])
    }
  }, [Pets]);

  const [isOpen, setIsOpen] = useState(false);

  const confirmDeletePet = (petId: string) => {
    const confirmMessage = "Tem certeza de que deseja remover este pet? Todo o histórico será perdido.";
    if (window.confirm(confirmMessage)) {
      deletePet({ id: petId });
      toast.info("deletado");
    }
  };

  const handleEditPet = (petId: string) => {
    const petToEdit = Pets.find(pet => pet.id === petId); 
    console.log('petToEdit', petToEdit)
    if (petToEdit) {
      setEditPet(petToEdit);
      setIsOpen(true);
    }
  }
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

        { ( Pets && Pets.map((Pet) => (
          <div className={styles.buttonBox} key={Pet.id}>
            <Button color={Pet.color} type='secondary' onclick={() => console.log('Pet', Pet)}>
                <Link to={`/pet/${Pet.id}`}>
                  <h2>{ Pet.name } { Pet.type == 'cat' ? <FaCat /> : <FaDog />}</h2>
                </Link>
            </Button>
            {isProfile && <div className={styles.buttonOptions}>
              <Button type='circleDark' className={styles.closeButton} onclick={() => confirmDeletePet(Pet.id!)}>
                <FaTrashAlt />
              </Button>
              <Button type='circleDark' className={styles.closeButton} onclick={() => handleEditPet(Pet.id!)}>
                <FaRegEdit />
              </Button>
            </div>}
          </div>
        )) ) }

      </div>

      <Button onclick={() => setIsOpen(true)} type='primary'>Adicionar Pet</Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <PetForm user={user} pet={editPet} onclose={() => setIsOpen(false)} setnewpet={attachPet} _setPets={SetPets} />
      </Modal>

      <ToastContainer position="top-left" autoClose={5000} />
    </div>
  );
};

export default DashboardPetCard;