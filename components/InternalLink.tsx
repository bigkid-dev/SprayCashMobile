import { ComponentProps } from "react";
import { Link } from 'expo-router';


type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string};

import React from 'react'

export function InternalLink ({ href, ...rest} : Props) {
  return (
    <Link href={href} target="_blank" />
  )
}

export default InternalLink