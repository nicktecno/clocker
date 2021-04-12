/* eslint-disable no-unused-expressions */
import { Button, Container, Box, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useFetch } from '@refetty/react';
import { addDays, subDays } from 'date-fns';
import { Logo, useAuth, formatDate } from '../components';
import { getToken } from '../config/firebase/client';

const getAgenda = async ({ when }) => {
  const token = await getToken();

  return axios({
    method: 'get',
    url: '/api/agenda',
    params: { when },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const Header = ({ children }) => (
  <Box p={4} display='flex' alignItems='center' justifyContent='space-between'>
    {children}
  </Box>
);

export default function Agenda() {
  const [auth, { logout }] = useAuth();
  const router = useRouter();
  const [when, setWhen] = useState(() => new Date());
  const [data, { loading, status, error }, fetch] = useFetch(getAgenda, {
    lazy: true,
  });

  // pode usar o when do useState acima porém usou esse prevstate para evitar o problema de concorrencia
  const addDay = () => setWhen((prevstate) => addDays(prevstate, 1));
  const removeDay = () => setWhen((prevstate) => subDays(prevstate, 1));

  useEffect(() => {
    !auth.user && router.push('/');
  }, [auth.user, router]);

  useEffect(() => {
    fetch(when);
  }, [fetch, when]);

  return (
    <Container>
      <Header>
        <Logo size={175} />
        <Button onClick={logout}>Sair</Button>
      </Header>
      <Box mt={8} display='flex' alignItems='center'>
        <IconButton
          icon={<ChevronLeftIcon />}
          bg='transparent'
          onClick={removeDay}
        />
        <Box flex={1} textAlign='center'>
          {formatDate(when, 'PPPP')}
        </Box>
        <IconButton
          icon={<ChevronRightIcon />}
          bg='transparent'
          onClick={addDay}
        />
      </Box>
    </Container>
  );
}
