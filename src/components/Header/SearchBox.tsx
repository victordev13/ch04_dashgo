import { Flex, Input, Icon } from '@chakra-ui/react';
import { RiSearchLine } from 'react-icons/ri';

export function SearchBox() {
  return (
    <Flex
      as="label"
      flex={1}
      py={4}
      px={8}
      ml={6}
      maxWidth={400}
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full">
      <Input
        color="gray.400"
        variant="unstyled"
        placeholder="Buscar"
        _placeholder={{
          color: 'gray.600',
        }}
        px={4}
        mr={4}
      />
      <Icon as={RiSearchLine} fontSize={20} />
    </Flex>
  )
}
