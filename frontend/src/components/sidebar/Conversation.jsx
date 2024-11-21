
const Conversation = () => {
  return (
    <>
     <div className='flex items-center gap-2 p-2 py-1 hover:bg-sky-500 rounded cursor-pointer'>
        <div className="avatar online">
            <div className="w-12 rounded-full">
             <img src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png" alt=" user avatar " />
            </div>
        </div>
        <div className="flex flex-col flex-1"> 
            <div className="flex gap-3 justify-between">
              <p className="font-bold text-gray-200">Habu Doe</p>
              <span className="text-xl">🎃</span>
            </div>
        </div>
      </div>
     <div className="divider my-0 py-0 h-1" />
    </>
  )
}

export default Conversation