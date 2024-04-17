'use client'

// import { Button } from "@radix-ui/themes"
import { Button } from "../ui/button"
import Link from "next/link"

interface BackButtonProps {
    label: string,
    href: string
}

export const  BackButton = ({ label, href}: BackButtonProps) => {
 return (
    <Button
        variant="ghost"
        className="font-normal w-full"
        asChild 
    >
        <Link href={href}>{label}</Link>
    </Button>
 )
}