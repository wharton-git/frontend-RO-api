import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='flex justify-center items-center h-screen bg-gray-50 text-gray-900'>
            <div>
                <div>
                    I'm in home
                </div>
                <div>
                    <Link to="/input">
                        <div className='p-4 bg-gray-900 text-white border border-black rounded-md hover:bg-gray-800 transition-all'>
                            Ajouter des graph
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
