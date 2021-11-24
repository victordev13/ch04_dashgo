import { Box, Flex, Heading, Button, Icon, Table, Thead, Tbody, Th, Tr, Td, Checkbox, Text, IconButton } from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/Sidebar';

export default function UserList() {
  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1400} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Usuários</Heading>
            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="pink"
              leftIcon={<Icon as={RiAddLine} />}
            >
              Criar novo
            </Button>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px="6" color="gray.300" width="8">
                  <Checkbox colorScheme="pink"></Checkbox>
                </Th>
                <Th>Usuário</Th>
                <Th>Cadastrado em</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px="6" >
                  <Checkbox colorScheme="pink"></Checkbox>
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Victor Carvalho</Text>
                    <Text fontSize="small" color="gray.300">vtrcarvalho.13@gmail.com</Text>
                  </Box>
                </Td>
                <Td>05 de setembro, 2021</Td>
                <Td>
                  <IconButton
                    icon={<RiPencilLine />}
                    size="sm"
                    aria-label="Editar"
                    colorScheme="pink"
                    color="white"
                    fontSize="20" />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  )
}