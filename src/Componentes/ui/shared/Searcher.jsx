const Searcher = () => {
    return (
        // Component to look up information, it is gonna work by using a state no need to submit.
        <div className="w-[70%] min-w-40 max-w-80">
            <input type="text" placeholder="Search..."
                className="border border-white/25 text-xs md:text-[14px] focus:outline-none w-full focus:shadow-md
                focus:bg-transparent transition-colors duration-400 p-2 rounded-md focus:border-white text-white/75" 
            />
        </div>
    )
}

export default Searcher;