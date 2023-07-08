import React from 'react'
import '@/app/globals.css'
import Navbar from '@/components/navbar'
import { AiOutlineSearch } from 'react-icons/ai'
import ListingCard from '@/components/listingCard'
function Listings() {
  const [search, setSearch] = React.useState('')
  // const [pages, setPages] = React.useState(1) will implement pagination later.

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }

  const data = [
    {
      name: 'my education pls',
      description: 'contribute to organizations dedicated to animal welfare, animal rights, and the protection of endangered species. Your donations support animal rescue and rehabilitation efforts, conservation initiatives, advocacy for animal rights.',
      detailedInfo: 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam',
    },
    {
      name: 'save my grades',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam',
      detailedInfo: 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam',
    },
    {
      name: 'Animal Welfare',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam',
      detailedInfo: 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam',
    },
    {
      name: 'Animal Welfare',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam',
      detailedInfo: 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam',
    },
  ]

  const filteredCauses = data.filter((cause) =>
    cause.name.toLowerCase().includes(search.toLowerCase())
  );

  const listingCards = filteredCauses.map((item) => {
    return (
      <ListingCard name={item.name} description={item.description} detailedInfo={item.detailedInfo} />
    )
  })

  return (

    <div className='px-6 md:px-12 min-h-screen route-bg'>
      <Navbar />
      <div className='flex items-center mt-12'>
        <input onChange={handleSearch} className='border-[1px] text-[0.8rem] md:text-base focus:outline-none focus:border-white relative w-full rounded-md py-2 px-4 bg-primary border-[rgb(255,255,255,0.5)]' type='text' placeholder='search for a project / cause you care about'></input>
        <div className='p-1 bg-secondary cursor-pointer rounded-sm absolute right-16'><AiOutlineSearch className='' /></div>
      </div>
      <div className='mt-12 flex flex-wrap justify-between flex-col md:flex-row'>
        {listingCards}
      </div>
    </div>
  )
}

export default Listings