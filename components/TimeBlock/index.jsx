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
import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

import { Input } from '../Input';

const setSchedule = async (data) =>
  axios({
    method: 'post',
    url: '/api/schedule',
    data: {
      ...data,
      username: window.location.pathname.replace('/', ''),
    },
  });

const ModalTimeBlock = ({ isOpen, onClose, onComplete, children, errors }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Faça sua reserva</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button variant='ghost' onClick={onClose}>
          Cancelar
        </Button>
        <Button colorScheme='blue' mr={3} onClick={onComplete}>
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
    // eslint-disable-next-line no-shadow
    onSubmit: (values) => setSchedule({ ...values, when: time }),
    initialValues: {
      name: '',
      phone: '',
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Preenchimento obrigatório'),
      phone: yup.string().required('Preenchimento obrigatório'),
    }),
  });

  return (
    <Button p={8} bg='blue.500' color='white' onClick={toggle}>
      {time}

      <ModalTimeBlock
        isOpen={isOpen}
        onClose={toggle}
        onComplete={handleSubmit}
      >
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
            error={errors.phone}
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
