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
  Link,
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import NextLink from 'next/link';
import { useUsers } from '../../hooks/useUsers';
import { useState } from 'react';
import queryClient from '../../services/queryClient';
import { api } from '../../services/api';

export default function UserList() {
  const [currentPage, setCurrentPage] = useState(1);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
    RiAddLine,
  });

  const { data, isLoading, isFetching, error } = useUsers(currentPage);

  async function handlePrefetchUser(userId: number) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const { data } = await api.get(`users/${userId}`)

      return data;
    }, {
      staleTime: 1000 * 60 * 10
    });
  }

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
              {isFetching && !isLoading && (
                <Spinner
                  size="sm"
                  color="gray.500"
                  ml={4}
                />
              )}
            </Heading>
            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} />}>
                Criar novo
              </Button>
            </NextLink>
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
                  {data.users.map((user) => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme="pink"></Checkbox>
                      </Td>
                      <Td>
                        <Box>
                          <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                            <Text fontWeight="bold">
                              {user.name}
                            </Text>
                          </Link>
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
              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
