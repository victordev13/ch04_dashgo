import { Text, Link, Icon, LinkProps } from "@chakra-ui/react";
import { ElementType } from "react";

interface Props extends LinkProps {
  icon: ElementType;
  children: string;
}

export function NavLink({ icon, children, ...rest }: Props) {
  return (
    <Link display="flex" align="center" {...rest}>
      <Icon as={icon} fontSize="20" />
      <a><Text ml="4" fontWeight="medium">{children}</Text></a>
    </Link>
  )
}
