import React from 'react'
import Link from 'next/link'

type Props = {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: Props) => {
  return (
    <Link href={href} className="text-white">{children}</Link>
  )
}

export default NavLink