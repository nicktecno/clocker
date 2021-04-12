import {
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Modal,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

import { Input } from '../Input';

const ModalTimeBlock = ({ isOpen, onClose, onComplete, children, errors }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Modal Title</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button variant='ghost' onClick={onClose}>
          Cancelar
        </Button>
        <Button colorSchema='blue' mr={3} onClick={onComplete}>
          Reservar horário
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export const TimeBlock = ({ time }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prevState) => !prevState);

  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    handleBlur,
    touched,
  } = useFormik({
    onSubmit: () => {},
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Preenchimento obrigatório'),
      phone: yup.string().required('Preenchimento obrigatório'),
    }),
  });

  return (
    <Button p={8} bg='blue.500' color='white' onClick={toggle}>
      {time}

      <ModalTimeBlock isOpen={isOpen} onClose={toggle}>
        <>
          <Input
            label='Nome:'
            name='name'
            touched={touched.name}
            error={errors.name}
            value={values.name}
            placeholder='Digite seu nome'
            onChange={handleChange}
            onBlur={handleBlur}
            size='lg'
          />
          <Input
            label='Telefone'
            name='phone'
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='(99) 9 9999-9999'
            size='lg'
            mt={4}
          />
        </>
      </ModalTimeBlock>
    </Button>
  );
};
