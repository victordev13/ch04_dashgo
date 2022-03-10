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
            <PaginationItem number={1} onPageChange={onPageChange} />
            {currentPage > (2 + sibilingsCount) && (<Text color="gray.300" width="8" textAlign="center">...</Text>)}
          </>
        )}

        {previousPages.length > 0 && previousPages.map(page => (
          <PaginationItem number={page} key={page} onPageChange={onPageChange} />
        ))}

        <PaginationItem number={currentPage} isCurrent onPageChange={onPageChange} />

        {nextPages.length > 0 && nextPages.map(page => (
          <PaginationItem number={page} key={page} onPageChange={onPageChange} />
        ))}

        {(currentPage + sibilingsCount) < lastPage && (
          <>
            {(currentPage + 1 + sibilingsCount) < lastPage && (<Text color="gray.300" width="8" textAlign="center">...</Text>)}
            <PaginationItem number={lastPage} onPageChange={onPageChange} />
          </>
        )}
      </Stack>
    </Stack>
  )
}