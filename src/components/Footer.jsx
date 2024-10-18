import Image from 'next/image'
import gov from '@/assets/gov-co.png'
import alcaldia from '@/assets/alcaldia.webp'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="w-full h-auto bg-primary flex flex-col md:flex-row justify-between items-center p-4">
            <div className="flex items-center mb-4 md:mb-0">
                <span className="text-white text-sm text-center md:text-left">VillavoAlertas © {new Date().getFullYear()} - Todas las noticias de Villavicencio en un solo lugar.</span>
            </div>
            <div className="flex items-center space-x-4">
                <Link href='https://www.gov.co/' aria-label="Government Website" className="w-auto" target="_blank">
                    <Image src={gov} alt='Gobernación de Colombia Logo' width={100} height={40} className="object-contain" />
                </Link>
                <Link href='https://villavicencio.gov.co/' aria-label="Alcaldia Website" className="w-auto" target="_blank">
                    <Image src={alcaldia} alt='Alcaldia Logo' width={100} height={40} className="object-contain" />
                </Link>
            </div>
        </footer>
    )
}