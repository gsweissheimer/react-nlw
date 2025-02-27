import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pet, Family } from "../../types/index";
import { FaCat } from "react-icons/fa";

import Modal from "../modal/modal";

import './dashboardPetCard.css';
import Button from 'components/button/button';
import HighlightText from 'components/highlightText/highlightText';

interface DashboardPetCardProps {
  Pets: Pet[];
  Family?: Family;
}

const DashboardPetCard: React.FC<DashboardPetCardProps> = ({ Pets, Family }) => {

  const [isOpen, setIsOpen] = useState(false);

  const allPets = [...Pets, ...(Family?.users.flatMap(user => user.pets) || [])];

  return (
    <div className='pet-main'>

      <HighlightText type='secondary'>Meus Pets</HighlightText>

      <div className='pet-cards'>

        { ( allPets && allPets.map((Pet) => (
          <Button key={Pet.id} type='secondary' onclick={() => console.log('Pet', Pet)}>
              <Link to={`/pet/${Pet.id}`}>
                <h2>{ Pet.name } <FaCat /></h2>
              </Link>
          </Button>
        )) ) }

      </div>

      <Button onclick={() => setIsOpen(true)} type='primary'>Adicionar Pet</Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>Este é um modal simples e reutilizável.</p>
      </Modal>

    </div>
  );
};

export default DashboardPetCard;