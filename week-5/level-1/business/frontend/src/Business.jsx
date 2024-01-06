import React from 'react'

const Business = ({
    name, 
    description,
    interests,
    socials
}) => {
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='border rounded-md shadow-md p-2 m-1  max-w-[1080px] w-full'>
            <h1 className='text-4xl font-bold underline m-2 p-1'>{name}</h1>
            <div className='font-light text-2xl m-2 p-1'>{description}</div>
            <div className='font-bold text-3xl m-2 p-2'>Interests</div>
            <div className='m-2 p-2 flex gap-2 justify-start items-center'>
                {
                    interests?.map((interest) => {
                        return (
                            <div className='px-4 py-2 text-white font-semibold bg-blue-400 hover:bg-blue-500 transition-all duration-200 cursor-pointer rounded-md shadow-md'>
                                {interest}
                            </div>
                        )
                    })
                }
            </div>
            <div className='font-bold text-3xl m-2 p-2'>Socials</div>
            <div className='m-2 p-2 flex gap-2 justify-start items-center'>
                {
                    socials?.map((social) => {
                        return (
                            <div className='px-4 py-2 text-white font-semibold bg-blue-400 hover:bg-blue-500 transition-all duration-200 cursor-pointer rounded-md shadow-md'>
                                {social}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Business; 