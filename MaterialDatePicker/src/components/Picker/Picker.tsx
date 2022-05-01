/* eslint-disable prettier/prettier */
import React, { FC, useCallback, useState } from 'react';
import { Text } from 'react-native';
import { Modal } from '../Modal';

type PickerType = {
    isOpen?: boolean;
    onSubmit: (date: Date) => void;
    onClose: () => void;
    
};


const Picker:FC<PickerType> = ({
    isOpen,
    onSubmit,
    onClose,
}) => {
    const [showModal, setShowModal] = useState<boolean>(true);
    const onHandleOpen = useCallback(() => {
        setShowModal(true);
    },[]);
    const onCloseModal = useCallback(() => {
        setShowModal(false);
    },[]);

    return (
        <>
        <Text onPress={onHandleOpen}>OPEN</Text>
            {showModal && <Modal
            onClose={onCloseModal}
            />}
        </>

    );
};

export default Picker;
