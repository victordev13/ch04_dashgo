import { Text, Link as ChakraLink, Icon, LinkProps } from "@chakra-ui/react";
import { ElementType } from "react";
import Link from 'next/link';
import { ActiveLink } from "../ActiveLink";

interface Props extends LinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: Props) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <a><Text ml="4" fontWeight="medium">{children}</Text></a>
      </ChakraLink>
    </ActiveLink>
  )
}
