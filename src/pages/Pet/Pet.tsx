import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Dashboard from '../Dashboard/Dashboard';

import PetHome from '../../components/petHome/petHome';

import { usePet } from "../../hooks/usePet";


import './Pet';

const Pet = () => {

    const { id } = useParams();
    const { Pet, getPet } = usePet();

    useEffect(() => {
        if (id && !Pet) {
            getPet({ id });
        }
    }, [id]);

    return (
        <Dashboard pageTitle='Pet'>
            {Pet && <PetHome Pet={Pet} />}
        </Dashboard>
    );
};

export default Pet;