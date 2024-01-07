import React from 'react'

const Business = ({
    title, 
    description,
    interests,
    twitter,
    insta
}) => {

  return (

    <div className='flex justify-center items-center gap-2 mt-5'>
        <div className='border rounded-md shadow-lg p-2 m-1  max-w-[1080px] w-full'>
            <h1 className='text-4xl font-bold underline m-2 p-1'>{title}</h1>
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
                <a className='px-4 py-2 text-white font-semibold bg-blue-400 hover:bg-blue-500 transition-all duration-200 cursor-pointer rounded-md shadow-md' href={twitter} target='_blank' rel='noopener noreferrer'>
                    Twitter
                </a>
                <a className='px-4 py-2 text-white font-semibold bg-blue-400 hover:bg-blue-500 transition-all duration-200 cursor-pointer rounded-md shadow-md' href={insta} target='_blank' rel='noopener noreferrer'>
                    Instagram
                </a>
            </div>
        </div>
    </div>
  )
}

export default Business; 