import { Flex } from '@chakra-ui/react';
import { Header } from '../components/Header/Header';
import { Sidebar } from '../components/Sidebar/Sidebar';

export default function DashBoard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxWidth={1400} mx="auto"px="6">
        <Sidebar/>
      </Flex>
    </Flex>
  );
}
