import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return(
    <>
    <div className='flex justify-center items-center'>
     <div className='mt-[10vw]'><SignIn /></div>
    </div>
    <footer className="bg-gray-900 flex justify-center items-center py-10 mt-auto">
            <p className="text-sm text-white">
              &copy; 2025 SpideyDev. All rights reserved.
            </p>
        </footer>
    </>

  )
}