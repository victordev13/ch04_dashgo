import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Checkbox,
  Text,
  IconButton,
  useBreakpointValue,
  Spinner,
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import Link from 'next/link';
import { useQuery } from 'react-query';

export default function UserList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { data, isLoading, error } = useQuery(
    'users',
    async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      const users = data.users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: new Date(
            user.createdAt
          ).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          }),
        };
      });

      return users;
    },
    {
      staleTime: 1000 * 5, // durante 5 segundos não revalida os dados
    }
  );

  return (
    <Box>
      <Header />
      <Flex
        w="100%"
        my="6"
        maxWidth={1400}
        mx="auto"
        px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex
            mb="8"
            justify="space-between"
            align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>
            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} />}>
                Criar novo
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>
                Não conseguimos encontrar os usuários
              </Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th
                      px={['4', '4', '6']}
                      color="gray.300"
                      width="8">
                      <Checkbox colorScheme="pink"></Checkbox>
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && (
                      <Th>Cadastrado em</Th>
                    )}
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((user) => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme="pink"></Checkbox>
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">
                            {user.name}
                          </Text>
                          <Text
                            fontSize="small"
                            color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && (
                        <Td>{user.createdAt}</Td>
                      )}
                      <Td>
                        <IconButton
                          icon={<RiPencilLine />}
                          size="sm"
                          aria-label="Editar"
                          colorScheme="pink"
                          color="white"
                          fontSize="20"
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
