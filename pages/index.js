/* eslint-disable no-unused-expressions */
import { Container, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../components';

export default function Home() {
  const [auth] = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.loading) {
      auth.user ? router.push('/agenda') : router.push('/login');
    }
  }, [auth.user, router, auth.loading])

  return (
    <Container p={4} centerContent>
      <Spinner />
    </Container>
  );
}
