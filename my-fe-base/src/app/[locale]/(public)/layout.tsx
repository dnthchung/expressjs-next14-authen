//file này sẽ define layout cho các page bên trong public, dùng chung.
import { Menu, Package2 } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, Button, SheetHeader, SheetTitle, SheetDescription } from '@/components'
import DarkModeToggle from '@/components/features/dark-mode-toggle'
import NavItems from '@/app/[locale]/(public)/nav-items'
import SwitchLanguage from '@/components/features/switch-language'
import { Link } from '@/navigation'
import { setRequestLocale } from 'next-intl/server'

export default function Layout({
  children,
  modal,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
  params: { locale: string }
}>) {
  setRequestLocale(locale)
  return (
    <>
      <div className='flex min-h-screen w-full flex-col relative'>
        <header className='sticky z-20 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
          <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
            <Link href='/' className='flex items-center gap-2 text-lg font-semibold md:text-base'>
              <Package2 className='h-6 w-6' />
              <span className='sr-only'>Big boy</span>
            </Link>
            <NavItems className='text-muted-foreground transition-colors hover:text-foreground flex-shrink-0' />
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
                <Menu className='h-5 w-5' />
                <span className='sr-only'>Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left'>
              <SheetHeader>
                <SheetTitle>navigation Menu</SheetTitle>
                <SheetDescription>Đây là menu điều hướng, bạn có thể chọn các liên kết bên dưới.</SheetDescription>
              </SheetHeader>
              <nav className='grid gap-6 text-lg font-medium'>
                <Link href='/' className='flex items-center gap-2 text-lg font-semibold'>
                  <Package2 className='h-6 w-6' />
                  <span className='sr-only'>Big boy</span>
                </Link>

                <NavItems className='text-muted-foreground transition-colors hover:text-foreground' />
              </nav>
            </SheetContent>
          </Sheet>
          <div className='ml-auto flex items-center gap-4'>
            <SwitchLanguage />
            <DarkModeToggle />
          </div>
        </header>
        <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
          {children}
          {modal}
        </main>
      </div>
      {/* <div className='flex min-h-screen w-full flex-col relative'>{children}</div> */}
    </>
  )
}
