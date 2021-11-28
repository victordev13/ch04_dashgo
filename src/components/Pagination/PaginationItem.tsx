import { Button } from "@chakra-ui/button";

interface Props {
  number: number;
  isCurrent?: boolean;
}

export function PaginationItem({ isCurrent, number }: Props) {
  return (
    isCurrent ? (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="pink"
        disabled
        _disabled={{
          bg: 'pink.500',
          cursor: 'default'
        }}
      >
        {number}
      </Button>
    ) : (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="pink"
        bg="gray.700"
        _hover={{
          bg: 'gray.500'
        }}
      >
        {number}
      </Button>
    )
  )
}
