import { Stack, Box, Text } from '@chakra-ui/react';
import { PaginationItem } from './PaginationItem';

type Props = {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const sibilingsCount = 1;

function generatePagesInterval(from: number, to: number) {
  return [... new Array(to - from)]
    .map((_, index) => { return from + index + 1 })
    .filter(page => page > 0)
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage,
  onPageChange
}: Props) {
  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage)

  const previousPages = currentPage > 1
    ? generatePagesInterval(currentPage - 1 - sibilingsCount, currentPage - 1)
    : []

  const nextPages = currentPage < lastPage
    ? generatePagesInterval(currentPage, Math.min(currentPage + sibilingsCount, lastPage))
    : []

  console.log(lastPage);
  console.log(nextPages);
  console.log(currentPage);

  return (
    <Stack
      direction={["column", "row"]}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>{currentPage * registersPerPage - registersPerPage + 1}</strong> - <strong>
          {currentPage === lastPage ? totalCountOfRegisters : registersPerPage * currentPage}
        </strong> de <strong>
          {totalCountOfRegisters}
        </strong>
      </Box>
      <Stack direction="row" spacing="2">

        {currentPage > (1 + sibilingsCount) && (
          <>
            <PaginationItem number={1} />
            {currentPage > (2 + sibilingsCount) && (<Text color="gray.300" width="8" textAlign="center">...</Text>)}
          </>
        )}

        {previousPages.length > 0 && previousPages.map(page => (
          <PaginationItem number={page} key={page} />
        ))}

        <PaginationItem number={currentPage} isCurrent />

        {nextPages.length > 0 && nextPages.map(page => (
          <PaginationItem number={page} key={page} />
        ))}

        {(currentPage + sibilingsCount) < lastPage && (
          <>
            {(currentPage + 1 + sibilingsCount) < lastPage && (<Text color="gray.300" width="8" textAlign="center">...</Text>)}
            <PaginationItem number={lastPage} />
          </>
        )}
      </Stack>
    </Stack>
  )
}